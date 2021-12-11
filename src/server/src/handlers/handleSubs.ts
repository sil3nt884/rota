// // eslint-disable-next-line @typescript-eslint/ban-ts-comment
// // @ts-ignore
// import * as webpush from 'web-push';
// import * as NodeCache from 'node-cache';
// import {Request, Response} from 'express';
// import {fetch} from '../service/db';
// import * as Events from 'events';
// import * as Process from 'process';
//
//
// const [unassignedTaskKey, assignedTaskKey, doneTaskKey, assignee] = ['unassignedTask', 'assignedTask', 'doneTask', 'assignees'];
//
// const keysMap = {
//   [unassignedTaskKey]: 'new task created or updated',
//   [assignedTaskKey]: 'A Task as been assigned to',
//   [doneTaskKey]: 'A task has been done',
//   [assignee]: 'A new assignee created',
// };
//
// const timeoutPromise = () => {
//   return new Promise((resolve) => {
//     setTimeout(()=>{
//       resolve('');
//     }, 1000 * 10);
//   });
// };
//
// const promiseRunner = (promises: Promise<any>[], events: Events) => {
//   promises[0]
//       .then((data) =>events.emit('updates resolved', data));
//   promises[1]
//       .then(()=> events.emit('timeout resolved'));
//
//   return new Promise((resolve) => {
//     events.on('timeout resolved', () => {
//       console.log('timeout');
//       resolve(undefined);
//     });
//     events.on('updates resolved', (data) => {
//       console.log('data resolved');
//       resolve(data);
//     });
//   });
// };
//
// const getUpdates = async (cache: NodeCache, events: Events) => {
//   const timeout = new Promise((resolve) => {
//     timeoutPromise()
//         .then(() => {
//           if (events.listeners('cacheExpired').length) {
//             events.removeAllListeners('cacheExpired');
//             resolve(undefined);
//           } else {
//             resolve(undefined);
//           }
//         });
//   });
//
//   const updates = new Promise((resolve) => {
//     events.on('cacheExpired', (key, value) => {
//       console.log('cacheExpired Event Fired')
//       const task = unassignedTaskKey || assignedTaskKey || doneTaskKey;
//       if (key === task) {
//         resolve(`${keysMap[key]}, ${value.map((v : any) => v.id)}`);
//       } else {
//         resolve(`${keysMap[key]}, ${value.map((v : any) => v.name)}`);
//       }
//     });
//   });
//
//   return promiseRunner([updates, timeout], events);
// };
//
//
// // eslint-disable-next-line require-jsdoc
// export default async function(cache : NodeCache, req: Request, res: Response, events: Events) {
//   events.removeAllListeners('timeout resolved');
//   events.removeAllListeners('updates resolved');
//   const vapidKeys = {
//     privateKey: 'bdSiNzUhUP6piAxLH-tW88zfBlWWveIx0dAsDO66aVU',
//     publicKey: 'BIN2Jc5Vmkmy-S3AUrcMlpKxJpLeVRAfu9WBqUbJ70SJOCWGCGXKY-Xzyh7HDr6KbRDGYHjqZ06OcS3BjD7uAm8',
//   };
//
//   webpush.setVapidDetails('mailto:example@yourdomain.org', vapidKeys.publicKey, vapidKeys.privateKey);
//   const subscriptionId : any = req.params.id;
//   const subscriptions = await fetch('subscriptions');
//   const subs = subscriptions.map((e) => ({[e.id]: e.value}))
//       .reduce((a, b) => ({...a, ...b}));
//
//   const sub = JSON.parse(subs[subscriptionId]);
//   const updates = await getUpdates(cache, events);
//   console.log(updates);
//   if (updates) {
//     webpush
//         .sendNotification(
//             sub,
//             JSON.stringify({
//               title: 'Rota is saying Hi',
//               text: `Hey! ${updates}`,
//               tag: 'Update',
//             })
//         )
//         .catch((err: any) => {
//           console.log(err);
//         });
//   }
//
//   res.status(202).json({});
// }
