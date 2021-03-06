/*
 * @Author: your name
 * @Date: 2020-10-09 21:18:18
 * @LastEditTime: 2020-10-10 00:46:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /s10/scripts/medium.js
 */

function render(matches) {
    if (matches.length > 0) {
        const views = matches[0].matches.map(m => {
            let resultView = {
                type: "text",
                props: {
                    text: m.status === -1 ? `未开始` : "进行中",
                    bold: true,
                    font: {
                        // weight: "bold",
                        size: 15
                    }
                }
            };
            if (m.result) {
                resultView = {
                    type: "text",
                    props: {
                        text: `${m.result[0]}:${m.result[1]}`,
                        bold: true,
                        font: {
                            // weight: "bold",
                            size: 15
                        }
                    }
                };
            }
            return {
                type: "hstack",
                props: {
                    alignment: $widget.verticalAlignment.center,
                    spacing: 85
                },
                views: [
                    {
                        type: "vstack",
                        props: {
                            alignment: $widget.horizontalAlignment.center,
                            spacing: 0
                        },
                        views: [
                            {
                                type: "image",
                                props: {
                                    path: `assets/${m.team[0]}_min.png`
                                }
                            },
                            {
                                type: "text",
                                props: {
                                    text: `${m.team[0]}`,
                                    font: {
                                        size: 10
                                    }
                                }
                            }
                        ]
                    },
                    {
                        type: "vstack",
                        props: {
                            alignment: $widget.horizontalAlignment.center,
                            spacing: 0
                        },
                        views: [
                            resultView,
                            {
                                type: "text",
                                props: {
                                    text: `(${m.time})`,
                                    bold: true,
                                    font: {
                                        size: 12
                                    }
                                }
                            }
                        ]
                    },
                    {
                        type: "vstack",
                        props: {
                            alignment: $widget.horizontalAlignment.center,
                            spacing: 0
                        },
                        views: [
                            {
                                type: "image",
                                props: {
                                    path: `assets/${m.team[1]}_min.png`
                                }
                            },
                            {
                                type: "text",
                                props: {
                                    text: `${m.team[1]}`,
                                    font: {
                                        size: 10
                                    }
                                }
                            }
                        ]
                    },
                ]
            }
        });
        return {
            type: "hgrid",
            props: {
                rows: Array(6).fill({
                    flexible: {
                        minimum: 0,
                        maximum: Infinity
                    },
                }),
            },
            views: views
        }
    }
}

module.exports = {
    render: render
}