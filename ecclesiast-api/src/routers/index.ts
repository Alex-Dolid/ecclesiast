import { localesRouter as locales } from "../modules/locales";
import { biblesRouter as bibles } from "../modules/bibles";
import { bibleBooksRouter as bibleBooks, BIBLE_BOOKS_COLLECTION_NAME } from "../modules/bibleBooks";
import { bibleChaptersRouter as bibleChapters, BIBLE_CHAPTERS_COLLECTION_NAME } from "../modules/bibleChapters";
import { biblesVersesRouter as biblesVerses } from "../modules/biblesVerses";
import { usersRouter as users } from "../modules/users";
import { accessRolesRouter as accessRoles } from "../modules/accessRoles";
import { authRouter as auth } from "../modules/auth";

export const routes = {
  "/locales": locales,
  "/bibles": bibles,
  [`/${ BIBLE_BOOKS_COLLECTION_NAME }`]: bibleBooks,
  [`/${ BIBLE_CHAPTERS_COLLECTION_NAME }`]: bibleChapters,
  "/bibles-verses": biblesVerses,
  "/users": users,
  "/access-roles": accessRoles,
  "/auth": auth
};
