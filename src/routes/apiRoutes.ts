import { Router } from "express";
import {apiKeyCreateController, apiKeyRevokeController,getUserApiController} from '../controllers/apikeys';
import {notFoundControler} from '../controllers/notFoundcontroller'
import {authenticate} from '../controllers/jwtcontroller'

const apiRoutes = Router();


apiRoutes.post('/authenticate',authenticate);
apiRoutes.post('/',apiKeyCreateController);
apiRoutes.delete('/:id', apiKeyRevokeController);
apiRoutes.get('/',getUserApiController);

//not found route
apiRoutes.all('*', notFoundControler)
export {apiRoutes};