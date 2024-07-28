import ApexCharts from "apexcharts";

// Membuat kategori tanggal untuk bulan Juli
const categories = [];
for (let i = 1; i <= 29; i++) {
    categories.push(`${i} July`);
}

// Membuat data "Sales Performance" yang meningkat dari nilai yang ditentukan dengan variasi gelombang
const salesData = [
    10000, 10500, 11000, 11500, 12000, 12500, 13000, 13500, 14000, 14500, 15000, 15500, 16000, 16500, 17000, 17500, 18000, 18500, 19000, 19500, 20000, 20500,
    21000, 21500, 22000, 22500, 23000, 23500, 25000,
];

const options = {
    markers: {
        size: 0,
        backgroundColor: "#155EFB",
    },
    chart: {
        height: "148",
        width: "100%",
        type: "area",
        fontFamily: "Poppins, sans-serif",
        dropShadow: {
            enabled: false,
        },
        toolbar: {
            show: false,
        },
    },
    tooltip: {
        enabled: true,
        x: {
            show: false,
        },
    },
    fill: {
        type: "gradient",
        gradient: {
            opacityFrom: 0.55,
            opacityTo: 0.23,
            shade: "#155EFB",
            gradientToColors: ["#155EFB"],
        },
    },
    dataLabels: {
        enabled: false,
    },
    stroke: {
        width: 6,
    },
    grid: {
        show: true,
        strokeDashArray: 4,
        padding: {
            left: 10,
            right: 0,
            top: 0,
        },
    },
    series: [
        {
            name: "Sales Performance",
            data: salesData,
            color: "#155EFB",
        },
    ],
    xaxis: {
        labels: {
            show: false,
        },
        axisBorder: {
            show: false,
        },
        axisTicks: {
            show: false,
        },
    },
    yaxis: {
        show: true,
        labels: {
            formatter: function (value) {
                return value / 1000 + "k";
            },
            style: {
                fontFamily: "Poppins",
                fontSize: "12px",
                fontStyle: "normal",
                fontWeight: "500",
                lineHeight: "normal",
                letterSpacing: "0.36px",
            },
        },
    },
};

if (document.getElementById("area-chart") && typeof ApexCharts !== "undefined") {
    const chart = new ApexCharts(document.getElementById("area-chart"), options);
    chart.render();
}
