import bcrypt from 'bcrypt';
import util from 'util';
import jwt from 'jsonwebtoken';
import sendmail from '../utils/mail.utils';
// Passport pour le username/logout -> req.user
import * as mod from '../models/usersmod';
import * as op from '../utils/passport.utils';

// Constants
const MAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{6,}/;
const VERIF_LN_REGEX = /^[a-zA-Z0-9_.-]*$/;
const VERIF_L_REGEX = /^[a-zA-Z_.-]*$/;

// FONCTIONS
