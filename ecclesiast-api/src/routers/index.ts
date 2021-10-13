import { localesRouter as locales, LOCALES_COLLECTION_NAME } from "../modules/locales";
import { biblesRouter as bibles, BIBLES_COLLECTION_NAME } from "../modules/bibles";
import { bibleBooksRouter as bibleBooks, BIBLE_BOOKS_COLLECTION_NAME } from "../modules/bibleBooks";
import { bibleChaptersRouter as bibleChapters, BIBLE_CHAPTERS_COLLECTION_NAME } from "../modules/bibleChapters";
import { biblesVersesRouter as biblesVerses } from "../modules/biblesVerses";
import { usersRouter as users, USERS_COLLECTION_NAME } from "../modules/users";
import { accessRolesRouter as accessRoles, ACCESS_ROLES_COLLECTION_NAME } from "../modules/accessRoles";
import { authRouter as auth, AUTH_COLLECTION_NAME } from "../modules/auth";

export const routes = {
  [`/${ LOCALES_COLLECTION_NAME }`]: locales,
  [`/${ BIBLES_COLLECTION_NAME }`]: bibles,
  [`/${ BIBLE_BOOKS_COLLECTION_NAME }`]: bibleBooks,
  [`/${ BIBLE_CHAPTERS_COLLECTION_NAME }`]: bibleChapters,
  "/bibles-verses": biblesVerses,
  [`/${ USERS_COLLECTION_NAME }`]: users,
  [`/${ ACCESS_ROLES_COLLECTION_NAME }`]: accessRoles,
  [`/${ AUTH_COLLECTION_NAME }`]: auth
};
