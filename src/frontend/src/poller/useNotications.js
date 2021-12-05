import {useInterval} from './useInterval';

const pushServerPublicKey = "BIN2Jc5Vmkmy-S3AUrcMlpKxJpLeVRAfu9WBqUbJ70SJOCWGCGXKY-Xzyh7HDr6KbRDGYHjqZ06OcS3BjD7uAm8";


function isPushNotificationSupported() {
  return "serviceWorker" in navigator && "PushManager" in window;
}

async function askUserPermission() {
  return await Notification.requestPermission();
}


function sendNotification() {
  const img = "/images/jason-leung-HM6TMmevbZQ-unsplash.jpg";
  const text = "Take a look at this brand new t-shirt!";
  const title = "New Product Available";
  const options = {
    body: text,
    icon: "/images/jason-leung-HM6TMmevbZQ-unsplash.jpg",
    vibrate: [200, 100, 200],
    tag: "new-product",
    image: img,
    badge: "https://spyna.it/icons/android-icon-192x192.png",
    actions: [{ action: "Detail", title: "View", icon: "https://via.placeholder.com/128/ff0000" }]
  };
  navigator.serviceWorker.ready.then(function(serviceWorker) {
    serviceWorker.showNotification(title, options);
  });
}


async function createNotificationSubscription() {
  //wait for service worker installation to be ready
  const serviceWorker = await navigator.serviceWorker.ready;
  // subscribe and return the subscription
  return await serviceWorker.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: pushServerPublicKey
  });
}

/**
 * returns the subscription if present or nothing
 */
function getUserSubscription() {
  //wait for service worker installation to be ready, and then
  return navigator.serviceWorker.ready
    .then(function(serviceWorker) {
      return serviceWorker.pushManager.getSubscription();
    })
    .then(function(pushSubscription) {
      return pushSubscription;
    });
}



export default async function  useNotifications () {

  console.log('is pushNofications supported', isPushNotificationSupported())
  let pushServerSubscriptionId =  undefined

  if(isPushNotificationSupported()) {
    await askUserPermission();
    const sub = await createNotificationSubscription()
    const id = await fetch('/subscription', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(sub)
    }).then(res => res.json())
      .then(res => res.id)
    pushServerSubscriptionId = id
  }

 setInterval(()=> {
   if(pushServerSubscriptionId) {
     fetch(`/subscription/${pushServerSubscriptionId}`)
   }
 }, 10000)
}
