import * as express from 'express';

import CatCtrl from './controllers/cat';
import DogCtrl from './controllers/dog';
import GodCtrl from './controllers/god'
import UserCtrl from './controllers/user';

import Cat from './models/cat';
import God from './models/god'
import Dog from './models/dog';
import User from './models/user';

export default function setRoutes(app) {

  const router = express.Router();

  const catCtrl = new CatCtrl();
  const dogCtrl = new DogCtrl();
  const userCtrl = new UserCtrl();
  const godCtrl = new GodCtrl();

  // Cats
  router.route('/cats').get(catCtrl.getAll);
  router.route('/cats/count').get(catCtrl.count);
  router.route('/cat').post(catCtrl.insert);
  router.route('/cat/:id').get(catCtrl.get);
  router.route('/cat/:id').put(catCtrl.update);
  router.route('/cat/:id').delete(catCtrl.delete);

  router.route('/gods').get(godCtrl.getAll);
  router.route('/gods/count').get(godCtrl.count);
  router.route('/god').post(godCtrl.insert);
  router.route('/god/:id').get(godCtrl.get);
  router.route('/god/:id').put(godCtrl.update);
  router.route('/god/:id').delete(godCtrl.delete);

  // Dogs
  router.route('/dogs').get(dogCtrl.getAll);
  router.route('/dogs/count').get(dogCtrl.count);
  router.route('/dog').post(dogCtrl.insert);
  router.route('/dog/:id').get(dogCtrl.get);
  router.route('/dog/:id').put(dogCtrl.update);
  router.route('/dog/:id').delete(dogCtrl.delete);

  // Users
  router.route('/login').post(userCtrl.login);
  router.route('/users').get(userCtrl.getAll);
  router.route('/users/count').get(userCtrl.count);
  router.route('/user').post(userCtrl.insert);
  router.route('/user/:id').get(userCtrl.get);
  router.route('/user/:id').put(userCtrl.update);
  router.route('/user/:id').delete(userCtrl.delete);

  // Apply the routes to our application with the prefix /api
  app.use('/api', router);

}
