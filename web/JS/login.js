let loginButton = document.getElementById('loginButton')
let id = document.getElementById('id')
let password = document.getElementById('password')

let loginFail = () => {
    alert(`login fail!`)
}

loginButton.addEventListener('click',() => {
    let id_value = id.value;
    let pw_value = password.value;
    let str = `/read_users?id=id_value`

    jQuery.ajax({
        type:'GET',						// GET 방식으로
        url: `${str}`,		            // saveVideo.php로 전송
        processData:false,				// 기본 설정
        contentType: false,				// 기본 설정
        success: function(msg) {		// 성공시
            if(msg == 'null') {
                loginFail()
                return 0;
            }

            try {
                console.log(msg)
                var obj = JSON.parse(msg)
                alert(`login!`)
            } catch(e) {loginFail()}
        },error: function(msg) {		// 실패시
            loginFail()
        }
      });
})