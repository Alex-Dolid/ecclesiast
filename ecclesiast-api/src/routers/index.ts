import { localesRouter as locales } from "../modules/locales";
import { biblesRouter as bibles } from "../modules/bibles";
import { biblesBooksRouter as biblesBooks } from "../modules/biblesBooks";
import { biblesChaptersRouter as biblesChapters } from "../modules/biblesChapters";
import { biblesVersesRouter as biblesVerses } from "../modules/biblesVerses";
import { usersRouter as users } from "../modules/users";
import { accessRolesRouter as accessRoles } from "../modules/accessRoles";
import { authRouter as auth } from "../modules/auth";

export const routes = {
  "/locales": locales,
  "/bibles": bibles,
  "/bibles-books": biblesBooks,
  "/bibles-chapters": biblesChapters,
  "/bibles-verses": biblesVerses,
  "/users": users,
  "/access-roles": accessRoles,
  "/auth": auth
};
