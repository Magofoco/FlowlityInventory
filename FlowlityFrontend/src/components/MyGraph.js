import React, {Component,  useState, useEffect, useCallback} from 'react';
import { Line, Bar } from 'react-chartjs-2'


// [
//     {
//         label: 'This is a random dataset',
//         fill: false,
//         lineTension: 0.5,
//         borderColor: 'rgba(75,192,192,1)',
//         borderCapStyle: 'butt',
//         borderDash: [],
//         borderDashOffset: 0.0,
//         borderJoinStyle: 'miter',
//         pointBorderColor: 'rgba(75,192,192,1)',
//         pointBackgroundColor: '#fff',
//         pointBorderWidth: 1,
//         pointHoverRadius: 5,
//         pointHoverBackgroundColor: 'rgba(75,192,192,1)',
//         pointHoverBorderColor: 'rgba(220,220,220,1)',
//         pointHoverBorderWidth: 2,
//         pointRadius: 1,
//         pointHitRadius: 10,
//         data: [65, 59, 80, 81, 56]
//     },
//
// ]

// function getRandomColor() {
//     var letters = '0123456789ABCDEF';
//     var color = '#';
//     for (var i = 0; i < 6; i++) {
//         color += letters[Math.floor(Math.random() * 16)];
//     }
//     return color;
// }



function MyChart({results}) {

    // console.log("Results")
    // console.log(results)
    let selected_dates = results['selected_dates']
    let products_results = results['selected_products']


    let my_dataset = []

    var i;
    if (products_results) {
        my_dataset = []

        for (i = 0; i < products_results.length; i++) {
            let dataset_dict = {}
            dataset_dict['label'] = products_results[i]['product_name']
            dataset_dict['data'] = products_results[i]['inventory']
            dataset_dict['lineTension'] = 0.5
            dataset_dict['fill'] = false
            dataset_dict['borderColor'] = products_results[i]['color']
            dataset_dict['backgroundColor'] = products_results[i]['color']
            my_dataset.push(dataset_dict)
            console.log(my_dataset)
        }
    }


    let data = {
        labels: selected_dates,
        datasets: my_dataset
    };

    if (results.length === 0) {
        return null
    } else if (results["selected_dates"].length > 1) {
        return(
            <div>
                    <Line
                        data={data}
                        options={{ maintainAspectRatio: true }}
                        redraw
                    />
                </div>
                )
    } else {
        return(
                <div>
                    <Bar
                        data={data}
                        options={{ maintainAspectRatio: true }}
                        redraw
                    />
                </div>
        )
    }
}

export default MyChart;