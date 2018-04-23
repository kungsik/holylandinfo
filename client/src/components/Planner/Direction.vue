<template>

    <v-content style="padding-top: 70px">
        <v-container grid-list-xl text-xs-center>
            <v-layout row wrap>
                <v-flex md6>
                    <v-text-field label="출발" v-model="origin" id="origin"></v-text-field>

                    <v-text-field v-model="place" id="place"></v-text-field>
                    <v-text-field label="경유" v-model="waypoints" id="waypoints"></v-text-field>

                    <v-text-field label="도착" v-model="destination" id="destination"></v-text-field>
                    <v-btn dark class="cyan" @click="showOptimizedDirection">경로찾기</v-btn>
                    <div id="summary"></div>
                </v-flex>  
                <v-flex md6>
                    <div id="map"></div>
                </v-flex>             
            </v-layout>
        </v-container>
    </v-content>

</template>

 <script> 

    export default {
        data() {
            return {
                origin: '',
                waypoints: '',
                destination: '',
                place: '',
                directionsService: {},
                directionsDisplay: {}
            }
        },
        mounted: function() {
            //지도를 띄어 줌
            const google = window.google

            this.directionsService = new google.maps.DirectionsService
            this.directionsDisplay = new google.maps.DirectionsRenderer
            var map = new google.maps.Map(document.getElementById('map'), {
                zoom: 7,
                center: {lat: 31.5353743, lng: 35.3046692}
            })
            this.directionsDisplay.setMap(map)

            //google place 검색 기능을 텍스트 필드에 적용
            var self = this
            var options = {
                componentRestrictions: {country: 'il'}
            }

            //출발지
            var inputOrigin = document.getElementById('origin')     
            var autocompleteOrigin = new google.maps.places.Autocomplete(inputOrigin, options)
            autocompleteOrigin.addListener('place_changed', function() {
                self.origin = autocompleteOrigin.getPlace().name 
            })

            //목적지
            var inputDestination = document.getElementById('destination')
            var autocompleteDestination = new google.maps.places.Autocomplete(inputDestination, options)
            autocompleteDestination.addListener('place_changed', function() {
                self.destination = autocompleteDestination.getPlace().name 
            })

            //경유지
            var inputWaypoints = document.getElementById('place')
            var autocompleteWaypoints = new google.maps.places.Autocomplete(inputWaypoints, options)
            autocompleteWaypoints.addListener('place_changed', function() {
                if(inputWaypoints.value.length > 0) {
                    self.waypoints += ';'+ autocompleteWaypoints.getPlace().name
                }
                else {
                    self.waypoints = autocompleteWaypoints.getPlace().name 
                }
            })

            //경유지 추가 알고리즘 계속해서 테스트 해 볼 필요.
            //장소 이름 위치 인식 테스트
        

        },
        methods: {
            //최적화 경로 구글맵 불러오기 
            //https://developers.google.com/maps/documentation/javascript/directions?authuser=1&hl=ko#Waypoints 참조
            showOptimizedDirection() {
                var waypts = []
                var waypointsArr = this.waypoints.split(";")
                for (var i = 0; i < waypointsArr.length; i++) {
                    waypts.push({
                        location: waypointsArr[i],
                        stopover: true
                    })
                }

                //콜백 함수 안에 this를 적용시키기 위함
                var self = this

                this.directionsService.route({
                    origin: this.origin,
                    destination: this.destination,
                    waypoints: waypts,
                    optimizeWaypoints: true,
                    travelMode: 'DRIVING'
                }, function(response, status) {
                    if(status === 'OK') {
                        self.directionsDisplay.setDirections(response)
                        var route = response.routes[0]
                        var summary = document.getElementById('summary')
                        summary.innerHTML = ''

                        var totalDistance = 0
                        var totalDuration = 0

                        for(var i=0; i<route.legs.length; i++) {
                            var routeNum = i + 1

                            summary.innerHTML += '<br>' + routeNum + '구간<br>'
                            summary.innerHTML += '거리: ' + route.legs[i].distance.text + '<br>'
                            summary.innerHTML += '시간: ' + route.legs[i].duration.text + '<br>'

                            //총거리와 총시간을 합산
                            totalDistance = totalDistance + route.legs[i].distance.value
                            totalDuration = totalDuration + route.legs[i].duration.value
                        }

                        var DurationTime = self.secondsToTime(totalDuration)

                        summary.innerHTML += '<br>총거리: ' + totalDistance / 1000 + 'km'
                        summary.innerHTML += '<br>총시간: ' + DurationTime.h + '시간 ' + DurationTime.m + '분'

                    }
                    else {
                        window.alert(status)
                    }
                })

            },
            secondsToTime(secs){
                secs = Math.round(secs);
                var hours = Math.floor(secs / (60 * 60));

                var divisor_for_minutes = secs % (60 * 60);
                var minutes = Math.floor(divisor_for_minutes / 60);

                var divisor_for_seconds = divisor_for_minutes % 60;
                var seconds = Math.ceil(divisor_for_seconds);

                var obj = {
                    "h": hours,
                    "m": minutes,
                    "s": seconds
                };
                return obj;
            }
        }
    }
 </script>

 

 <style>
    #map {
        width: 100%;
        height: 500px;
    }
 </style>
