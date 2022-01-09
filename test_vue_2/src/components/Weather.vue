<template>
    <div id="weather-app" :class="typeof weather.main != 'undefined' && weather.main.temp > 16 ? 'warm' : '' ">
        <main>
            <div class="search-box">
                <input 
                        type="text" 
                        class="search-bar"
                        placeholder="Search..."
                        v-model="query"
                        @keypress="fetchWeather"
                >
            </div>
            <div class="weather-wrap" v-if="typeof weather.main != 'undefined' ">
                <div class="address-weather">
                    {{ weather.name }}, {{ weather.sys.country}} 
                </div>
                <div class="date-weather">
                    {{ dateBuilder() }}
                </div> 
                <div class="weather-box">
                    <div class="temp">
                        {{ Math.round(weather.main.temp) }}<sup>o</sup> C
                    </div>
                    <div class="weather">
                        {{ weather.weather[0].main}}
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
export default {
    name: 'HelloWorld',
    data (){
        return{
            api_key: '8db841340dfa30f78addec3c449dafda',
            url_base: 'https://api.openweathermap.org/data/2.5/',
            query: '',
            weather: {}
        }
    },
    methods: {
        fetchWeather (e) {
            if (e.key == "Enter") {
                fetch(`${this.url_base}weather?q=${this.query}&units=metric&appid=${this.api_key}`)
                .then(res => {
                    return res.json();
                }).then(this.setResults)
            }
        },
        setResults (results) {
        this.weather = results;
        },
        dateBuilder () {
            let d = new Date();
            let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            let day = days[d.getDay()];
            let date = d.getDate();
            let month = months[d.getMonth()];
            let year = d.getFullYear();
            return `${day} ${date} ${month} ${year}`;
        }
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }

    #weather-app {
        position: fixed;
        top: 0;
        left: 0;
        min-height: 100%;
        min-width: 100%;
        background-image: url('../assets/bg-cold.jpg');
        background-repeat: no-repeat;
        background-position: center;
        background-size: 100% 100%;
        transition: 0,4s;
    }

    #weather-app.warm{
        background-image: url('../assets/bg-warm.jpg');
    }

    main {
        min-height: 100vh;
        padding: 25px;
        background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.5));
    }

    .search-box {
        margin: 30px;
        padding-bottom: 10px;
    }


    .search-box .search-bar{
        display: block;
        width: 100%;
        padding: 15px;
        border-radius: 5px;
        border: none;
        background: none;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
        background-color: rgba(255, 255, 255, 0.5);
        font-weight: bold;
        color: #313131;
        outline: none;
        transition: 0,4s;
    }

    .search-box .search-bar:focus{
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.75);
        background-color: rgba(255, 255, 255, 0.75);
        color :rgb(16, 16, 26);
        transition: 0,4s;
    }

    .weather-wrap{
        padding-bottom: 10px;
    }

    .weather-wrap .address-weather{
        text-align: center;
        font-size: 50px;
        color: white;
        font-weight: bold;
        padding-bottom: 5px;
    }

    .weather-wrap .date-weather{
        text-align: center;
        font-size: 20px;
        color:white;
        font-style: italic;
    }

    .weather-box {
        text-align: center;
    }

    .weather-box .temp {
        display: inline-block;
        font-size: 100px;
        font-weight: 900;
        color: white;
        background: rgba(255, 255, 255, 0.25);
        border-radius: 10px;
        padding: 10px 50px;
        margin: 30px 0px;
        text-shadow: 0px 1px rgb(49, 47, 47);
    }

    .weather-box .weather{
        font-size: 40px;
        font-weight: 900;
        color: white;
        font-weight: bold;
        font-style: italic;
        text-shadow: 0 2px black;
    }



</style>
