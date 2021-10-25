// Core
import { Ability } from '@casl/ability';
// Plugins
import { LocalStorage } from '@/plugins';
// Config
import { initialAbility } from './config';

//  Read ability from localStorage
// * Handles auto fetching previous abilities if already logged in user
// ? You can update this if you store user abilities to more secure place
// ! Anyone can update localStorage so be careful and please update this
const { userAbility } = LocalStorage();
const existingAbility = userAbility.data;

export default new Ability(existingAbility || initialAbility);
