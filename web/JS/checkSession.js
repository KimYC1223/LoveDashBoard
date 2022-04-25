let checkSessionResult = sessionStorage.getItem("fluidTrackSession");

if(checkSessionResult == null){
    location.href="/login"
}

// md5Data = calcMD5(checkSessionResult)
// let md5Str = `/check?pw=${md5Data}`

// jQuery.ajax({
//     type:'GET',						// POST 방식으로
//     url: `${md5Str}`,		// saveVideo.php로 전송
//     processData:false,					// 기본 설정
//     contentType: false,					// 기본 설정
//     success: function(msg) {			// 성공시
//         if(msg == `0`) {
//             sessionStorage.clear()
//             location.href="/login";
//         }
//     },error: function(msg) {			// 실패시
//         console.log(msg)
//     }
// });