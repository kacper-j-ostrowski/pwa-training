var defferedPrompt;

if ('serviceWorker' in navigator) {
    navigator.serviceWorker
    .register('/sw.js')
    .then(function() {
        console.log('Service worker registred   ');
    })
    .catch(function(err){
        console.log('error: ', err);
    });
}

window.addEventListener('beforeinstallprompt', function(event) {
    console.log('beforeinstallprompt fired');
    event.preventDefault();
    defferedPrompt = event;
    return false;
});

var promise = new Promise(function(resolve, reject) {
    setTimeout(function(){
        //resolve("This is executed once the timer is done@");
        reject({code: 500, message: "An error occured!"});
    },3000);
});


fetch('https://httpbin.org/post', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json' 
        },
        body: JSON.stringify({
            message: 'Does this work?'
        }),
        mode: 'cors'
    })
    .then(function(response){
        console.log(response);
        return response.json();
    })
    .then(function(data) {
        console.log(data);
    })
    .catch(function(err) {
        console.log(err);
    });

promise.then(function(text){
    return text;
}).then(function(newText){
    console.log('2: ');
})
.catch(function(err){
    console.log('catch', err.code, err.message);
});

console.log('This is executed right after setTimeout');