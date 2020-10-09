/*
 * @Author: your name
 * @Date: 2020-10-09 21:18:18
 * @LastEditTime: 2020-10-10 00:08:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /s10/scripts/medium.js
 */

function render(matches) {
    if (matches.length > 0) {
        const lastIndex = matches[0].matches.length - 1;
        const match = matches[0].matches[lastIndex];
        console.log(match)

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
        if (match.result) {
            resultView = {
                type: "text",
                props: {
                    text: `${match.result[0]}:${match.result[1]}`,
                    bold: true,
                    font: {
                        // weight: "bold",
                        size: 10
                    }
                }
            };
        }
        return {
            type: "vgrid",
            props: {
                columns: Array(3).fill({
                    flexible: {
                        minimum: 10,
                        maximum: Infinity
                    },
                }),
            },
            views: [
                {
                    type: "vstack",
                    props: {
                        alignment: $widget.horizontalAlignment.center,
                    },
                    views: [
                        {
                            type: "image",
                            props: {
                                path: `assets/${match.team[0]}.png`
                            }
                        },
                        {
                            type: "text",
                            props: {
                                text: `${match.team[0]}`
                            }
                        }
                    ]
                },
                {
                    type: "vstack",
                    props: {
                        alignment: $widget.horizontalAlignment.center,
                        spacing: 10
                    },
                    views: [
                        resultView,
                        {
                            type: "text",
                            props: {
                                text: "（19:00）",
                                font: $font("bold", 18)
                            }
                        },
                    ]
                },
                {
                    type: "vstack",
                    props: {
                        alignment: $widget.horizontalAlignment.center,
                    },
                    views: [
                        {
                            type: "image",
                            props: {
                                path: `assets/${match.team[1]}.png`
                            }
                        },
                        {
                            type: "hstack",
                            props: {
                                alignment: $widget.horizontalAlignment.center,
                            },
                            views: [
                                {
                                    type: "text",
                                    props: {
                                        text: `${match.team[1]}`
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    }
}

module.exports = {
    render: render
}