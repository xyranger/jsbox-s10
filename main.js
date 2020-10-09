/*
 * @Author: your name
 * @Date: 2020-10-09 20:23:27
 * @LastEditTime: 2020-10-10 00:54:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /jsbox-s10/MyScript 3.js
 */

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

async function getTodayMatches() {
    let matches = await $cache.getAsync({
        key: "matches"
    });
    if (!matches) {
        // https://gist.githubusercontent.com/xyranger/30c2bbeb820bb045317c1ccd78c3da26/raw/954938b42cb22c361b300f5cca0f1df8b53a1749/s10.json
        const s10Url = 'https://raw.githubusercontent.com/xyranger/jsbox-s10/master/s10.json';
        const result = await $http.get(s10Url);
        const data = result.data;
        const today = formatDate(new Date());
        matches = data.filter(d => d.day === today);
        console.log(matches)
        await $cache.setAsync({
            key: "matches",
            value: matches
        });
    }
    return matches;
}

$cache.clear();

let matches = await getTodayMatches();

var oldDate = new Date(),
    expireDate = new Date(oldDate);
expireDate.setMinutes(oldDate.getMinutes() + 10);

$widget.setTimeline({
    policy: {
        afterDate: expireDate
    },
    render: ctx => {
        $cache.getAsync({
            key: "lasyRenderTime",
            handler: time => {
                if (time !== expireDate) {
                    expireDate.setMinutes(expireDate.getMinutes() + 10);
                    $cache.set("lasyRenderTime", expireDate);
                    if (time) {
                        $cache.removeAsync("matches").then(() => {
                            getTodayMatches().then(m => {
                                matches = m;
                            });
                        });
                    }
                }
            }
        });
        const family = ctx.family;
        let jsPath = "";
        switch (family) {
            case 0:
                jsPath = 'scripts/small.js'
                break;
            case 1:
                jsPath = 'scripts/medium.js';
                break;
            case 2:
                jsPath = 'scripts/large.js';
                break;
        }
        const env = require(jsPath);
        return env.render(matches);
    }
});
