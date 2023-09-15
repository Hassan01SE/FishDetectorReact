import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Container';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
import { Bar } from "react-chartjs-2";

const History = () => {

    const [videoLinks, setVideoLinks] = useState([]);



    const username = localStorage.getItem('username');

    useEffect(() => {

        const apiUrl = `http://127.0.0.1:8000/api/history/?username=${username}`;


        axios
            .get(apiUrl)
            .then((response) => {

                const processedData = response.data.videos.map(item => {
                    // Parse the result_name string into an object
                    const resultNameObject = JSON.parse(item.result_name);

                    // Return a new object with the parsed result_name
                    return {
                        ...item,
                        result_name: resultNameObject
                    };
                });
                setVideoLinks(processedData);



            })
            .catch((error) => {
                console.error('Error fetching video links:', error);
            });
    }, [username]);








    return (
        <div>
            <Container fluid>
                <Row>
                    <h1>Your History of detected videos!</h1>
                    <h3>For username: {localStorage.getItem('username')}</h3>

                </Row>
                <br />
                <br />
                <Row>
                    <h2>Your Videos</h2>
                    <Col>
                        <ol>
                            {videoLinks.map((video, index) => (
                                <li style={{}} key={index}>
                                    {/*  <a href={video.url} target="_blank" rel="noopener noreferrer">
                                        {video.filename}
                                    </a> */}
                                    <div className="predicted-video">
                                        <video
                                            class="video-js"
                                            controls
                                            preload="auto"
                                            width="100%"
                                            height="70%"
                                        ><source src={video.url} type="video/mp4" /></video>

                                    </div>

                                    {/*  <div style={{ height: '200px', overflowY: 'auto', fontSize: '1em', border: '1.2px solid grey', borderRadius: '20px' }}>
                                        <ul style={{ listStyleType: "none" }}>
                                            {Object.entries(video.result_name).map(([key, value]) => (
                                                <li key={key}>
                                                    <strong>{key}:</strong> <span style={{ color: 'yellow' }}>{value}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div> */}

                                    <div style={{ maxWidth: "1250px" }}>
                                        <Bar
                                            data={{
                                                // Name of the variables on x-axies for each bar

                                                labels: [...Object.values(video.result_name)],
                                                datasets: [
                                                    {
                                                        // Label for bars
                                                        label: "prediction/specie name",
                                                        // Data or value of your each variable

                                                        data: [...Object.keys(video.result_name)],
                                                        // Color of each bar
                                                        backgroundColor: ["aqua", "green", "red", "yellow"],
                                                        // Border color of each bar
                                                        borderColor: ["aqua", "green", "red", "yellow"],
                                                        borderWidth: 0.5,
                                                    },
                                                ],
                                            }}
                                            // Height of graph
                                            height={350}
                                            options={{
                                                maintainAspectRatio: false,
                                                scales: {
                                                    yAxes: [
                                                        {
                                                            ticks: {
                                                                // The y-axis value will start from zero
                                                                beginAtZero: true,
                                                            },
                                                        },
                                                    ],
                                                },
                                                legend: {
                                                    labels: {
                                                        fontSize: 15,
                                                    },
                                                },
                                            }}
                                        />
                                    </div>

                                </li>
                            ))}
                        </ol>
                    </Col>
                </Row>
            </Container>
        </div>);
}

export default History;