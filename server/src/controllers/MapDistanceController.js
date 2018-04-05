const config = require('../config/config')

const googleMapsClient = require('@google/maps').createClient({
    key: config.mapApi,
    Promise: Promise
  })

//두 지역 사이의 거리, 시간 구하기
function getDistance(origin, destination) {
    var data = {
        "origins": [origin],
        "destinations": [destination],
        "mode": "driving",
        "units": "metric",
        "language": "ko"
    }
    googleMapsClient.distanceMatrix(data)
        .asPromise()
        .then((response) => {
            var result = {
                "distance": response.json.rows[0].elements[0].distance.value,
                "duration": response.json.rows[0].elements[0].duration.value
            }
            return result
        })
        .catch((err) => {
            return err.json
        })
}

module.exports = {
    async geocode (req, res) {
        await googleMapsClient.geocode(req.body)
            .asPromise()
            .then((response) => {
                res.send(response.json.results)
            })
            .catch((err) => {
                res.status(400).send({
                    error: err.json
                })
            })
    },
    //distance의 req 값은 array [lat, long]의 형태로 전달
    // async distance(req, res) {
    //     await googleMapsClient.distanceMatrix(req.body)
    //         .asPromise()
    //         .then((response) => {
    //             res.send({
    //                 distance: response.json.rows[0].elements[0].distance.value,
    //                 duration: response.json.rows[0].elements[0].duration.value
    //             })
    //         })
    //         .catch((err) => {
    //             res.status(400).send({
    //                 error: err.json
    //             })
    //         })
    // }
    async distance(req, res) {
        try {
            var distance = await getDistance(req.body.origin, req.body.destination)
            res.send({ response })            
        } catch(err) {
            res.status(400).send({
                error: "에러 발생"
            })
        }
    }

}
