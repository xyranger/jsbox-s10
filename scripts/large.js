/*
 * @Author: your name
 * @Date: 2020-10-09 21:18:18
 * @LastEditTime: 2020-10-10 00:12:17
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
                    text: `未开始`,
                    bold: true,
                    font: {
                        // weight: "bold",
                        size: 6
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
                            size: 10
                        }
                    }
                };
            }
            return {
                type: "hstack",
                props: {
                    alignment: $widget.alignment.left,
                    // spacing: 5
                },
                views: [
                    {
                        type: "text",
                        props: {
                            text: `${m.team[0]}`,
                            font: {
                                size: 12
                            }
                        }
                    },
                    {
                        type: "image",
                        props: {
                            path: `assets/${m.team[0]}.png`
                        }
                    },
                    {
                        type: "spacer",
                        props: {
                            minLength: 50
                        }
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
                                    text: "(19:00)",
                                    font: {
                                        size: 8
                                    }
                                }
                            }
                        ]
                    },
                    {
                        type: "spacer",
                        props: {
                            minLength: 50
                        }
                    },
                    {
                        type: "image",
                        props: {
                            path: `assets/${m.team[1]}.png`
                        }
                    },
                    {
                        type: "text",
                        props: {
                            text: `${m.team[1]}`,
                            font: {
                                size: 12
                            }
                        }
                    }
                ]
            }
        });
        return {
            type: "hgrid",
            props: {
                rows: Array(6).fill({
                    flexible: {
                        minimum: 10,
                        maximum: Infinity
                    },
                    // spacing: 10,
                    // alignment: $widget.alignment.left
                }),
                // spacing: 10,
                // alignment: $widget.verticalAlignment.center
            },
            views: views
        }
    }
}

module.exports = {
    render: render
}