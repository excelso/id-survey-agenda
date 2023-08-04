import Highcharts from "highcharts/highstock";

export const chartDataSerapCarbon = () => {
    const kategori = []
    const dataActual = []
    const dataProyeksi = []
    let nilaiPrev = 492.189
    let nilaiProyeksiPrev = 492.189
    for (let i = 2024; i <= 2027; i++) {
        kategori.push(i)
        nilaiPrev = (nilaiPrev * 5 / 100) + nilaiPrev
        dataActual.push({
            y: parseFloat(nilaiPrev.toFixed(2))
        })

        nilaiProyeksiPrev = (nilaiProyeksiPrev * 10 / 100) + nilaiProyeksiPrev
        dataProyeksi.push({
            y: parseFloat(nilaiProyeksiPrev.toFixed(2))
        })
        console.log(nilaiProyeksiPrev.toFixed(2))
    }

    Highcharts.chart('chart-serap-carbon', {
        chart: {
            type: 'column',
            style: {
                fontFamily: 'Nunito'
            }
        },
        accessibility: {
            enabled: false
        },
        title: {
            text: null
        },
        yAxis: {
            gridLineWidth: 1,
            gridLineDashStyle: 'LongDash',
            title: {
                text: 'Total'
            }
        },
        xAxis: {
            min: 0,
            max: 3,
            categories: kategori
        },
        tooltip: {
            formatter: function () {
                return `
                        <div class="flex flex-col">
                            <div class="text-sm">Rerata Serapan Karbon</div>
                            <div>
                                <table>
                                    <tr>
                                        <td class="text-sm text-[${this.color}] p-0">Nilai ${this.series.name}</td>
                                        <td class="p-0"><b class="ml-2">: ${Highcharts.numberFormat(this.y, 2)}</b></td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    `
            },
            useHTML: true,
        },
        scrollbar: {
            enabled: true,
        },
        series: [{
            name: 'Aktual',
            dataLabels: {
                enabled: true,
                inside: true,
                align: 'center',
                formatter: function () {
                    if (this.y !== 0)
                        return `<b><a href="https://google.com">${Highcharts.numberFormat(this.y, 2)}</a></b>`
                },
                style: {
                    width: 250,
                    textOverflow: "ellipsis"
                },
            },
            data: dataActual,
        },{
            name: 'Proyeksi',
            type: 'spline',
            dataLabels: {
                enabled: true,
                formatter: function () {
                    if (this.y !== 0)
                        return `<b><a href="https://google.com">${Highcharts.numberFormat(this.y, 2)}</a></b>`
                },
                style: {
                    width: 250,
                    textOverflow: "ellipsis"
                },
            },
            data: dataProyeksi,
        }],
        credits: {
            text: 'Pertamina Hulu Rokan',
            href: ''
        },
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        }
    })
}
