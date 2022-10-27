import {DIRECTUS_URL, DIRECTUS_MODE} from '$lib/helpers/Env'
import { Directus } from '@directus/sdk';
const directus = new Directus(DIRECTUS_URL, { auth: { mode: DIRECTUS_MODE } });

export {directus}