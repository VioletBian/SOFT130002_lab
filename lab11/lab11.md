#  Lab11 说明文档

卞雨喆 18307110428

## Cookie和Session的作用

### Cookie

1. 分为会话cookie和持久cookie，前者浏览器关闭就删除，后者过期时间到了才删除
2. 原始服务器在第一次响应中返回含Cookie值的标头，如果浏览器支持Cookie，则将其保存。以后在请求页面时，浏览器先查看现存的Cookie中是否有与请求页面相关联的Cookie，如果有则将Cookie信息加入HTTP头发回服务器。
3. 最初保存于浏览器内存中，当浏览器退出进程时将存入磁盘文本文件中，在整个过程中可以无需用户介入。Cookie在浏览器对话间持续保持有效，Cookie可以与特定的一个或多个网站相关联

### Session

1. 是一种服务器端状态持久化机制，将每个用户相对应的相关信息以内存或文件形式保存在服务器端
2. 以独特的SeesionID来唯一标识用户（在PHP中是一个32字节字符串），通过Cookie机制（默认）或改写URL机制（客户端关闭Cookie）来实现SeesionID的传输
3. 可以存在内存或文件中。

## Cookie和Session的优劣

|      | Cookie                                                       | Session                                                      |
| ---- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 优势 | 1. 用户可以对cookie有是否接受、大小数量、站点来源的限制      | 1. 可以存在内存中，I/O速度变快。2.客户端关闭Cookie也可以使用改写url机制 3. 使用串行化，使得对象存储和网络传输更有效率。4. 节省容量 5. 单一SessionID存储，可实现集群服务器共享信息 6. 存在服务器，所以安全性和个人隐私风险可控 |
| 劣势 | 1. 保存个数、保存大小有限制；2.字符串解析 3. 有些服务器不支持 4. 磁盘I/O速度慢 5. 安全性和个人隐私有风险 | 1. 若存在内存中，服务器重启易丢失。2.  集群存储时，单机存储无法负载均衡，共享机制容易发生单点故障。 |





## 代码解释

### Exercise1：第一种

```php

<?php
require_once("config.php");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if(validLogin()){
        // add 1 day to the current time for expiry time
        $expiryTime = time()+60*60*24;
        setcookie("Username", $_POST['username'], $expiryTime);
      
      // 成功登陆，写入cookie。此时跳转，使cookie生效。
        header("Location: " . $_SERVER['HTTP_REFERER']);
    }
    else{
        echo "login unsuccessful";
    }
}
else {
    if(isset($_COOKIE['Username'])){
        echo "Welcome ".$_COOKIE['Username'];
    }
    else{
        echo "No Post detected";
    }
}
?>

```

### Exercise1：另一种

```php
<?php
require_once("config.php");
// 使用一个布尔flag变量辅助
$loggedIn = false;

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if(validLogin()){
        $expiryTime = time()+60*60*24;
        setcookie("Username", $_POST['username'], $expiryTime);
      // 登陆成功：不跳转但设置该页面时flag=true
        $loggedIn = true;
      // 不使用$_COOKIE['Username']，用$_POST['username']
        echo "Welcome ".$_POST['username'];
    }
    else{
        echo "login unsuccessful";
    }
}
else {
    if(isset($_COOKIE['Username'])){
        echo "Welcome ".$_COOKIE['Username'];
      // 有cookie缓存：flag=true
         $loggedIn = true;
    }
    else{
        echo "No Post detected";
    }
}
?>

<?php
// 当且仅当无cookie也无flag时，展示登陆表单
if (!isset($_COOKIE['Username']) && !$loggedIn){
    echo getLoginForm();
} // 首次登入成功时，该页面下isset($_COOKIE['Username']) = false； $loggedIn=true；也能成功输出内容。
else{
    echo "This is some content";
    echo "<br><a href='logout1.php'>Log Out！</a>";
}
?>
```

