import { useEffect } from "react";

// 옵션 없이 지도 객체를 생성하면 서울 시청을 중심으로 하는 16 레벨의 지도가 생성됩니다.
const mapOptions = {
    center: new naver.maps.LatLng(37.3595704, 127.105399),
    zoom: 12,
    // zoomControl: true,
    // zoomControlOptions: {
    //     style: naver.maps.ZoomControlStyle.SMALL,
    //     position: naver.maps.Position.RIGHT_CENTER,
    // },
};

const getContentElement = (titleString) => {
    return "<div>" + titleString + "</div>";
};

export default () => {
    useEffect(() => {
        const infoWindow = new naver.maps.InfoWindow();

        /**
         *  Map 생성자 함수의
         *      첫번째 인자는 ID,
         *      두번째 인자는 Options
         */
        const map = new naver.maps.Map("map");
        // const map = new naver.maps.Map("map", mapOptions);

        function onSuccessGeolocation(position) {
            console.log("onSuccessGeolocation");
            const location = new naver.maps.LatLng(position.coords.latitude, position.coords.longitude);

            map.setOptions({
                center: location, // 얻은 좌표를 지도의 중심으로 설정
                zoom: 16, // 지도의 줌 레벨을 변경
            });

            // 마커 생성
            const myLocationMarker = new naver.maps.Marker({
                position: location,
                map: map,
                clickable: true,
            });

            naver.maps.Event.addListener(myLocationMarker, "click", function () {
                infoWindow.setContent(getContentElement("I'M HERE"));
                infoWindow.open(map, myLocationMarker);
            });

            infowindow.setContent("<div>" + "geolocation.getCurrentPosition() 위치" + "</div>");
            infowindow.open(map, location);
            console.log("Coordinates: " + location.toString());
        }

        function onErrorGeolocation() {
            const center = map.getCenter();

            infowindow.setContent(
                "<div>" +
                    "<h5>Geolocation failed!</h5>" +
                    "latitude: " +
                    center.lat() +
                    "<br />longitude: " +
                    center.lng() +
                    "</div>"
            );

            infowindow.open(map, center);
        }

        if (navigator.geolocation) {
            /**
             * navigator.geolocation 은 Chrome 50 버젼 이후로 HTTP 환경에서 사용이 Deprecate 되어 HTTPS 환경에서만 사용 가능 합니다.
             * http://localhost 에서는 사용이 가능하며, 테스트 목적으로, Chrome 의 바로가기를 만들어서 아래와 같이 설정하면 접속은 가능합니다.
             * chrome.exe --unsafely-treat-insecure-origin-as-secure="http://example.com"
             */
            navigator.geolocation.getCurrentPosition(onSuccessGeolocation, onErrorGeolocation);
        } else {
            const center = map.getCenter();
            infowindow.setContent("<div><h5>Geolocation not supported</h5></div>");
            infowindow.open(map, center);
        }
    }, []);
    return (
        <div
            id="map"
            style={{ width: "400", height: "400px" }}
        ></div>
    );
};
