import * as $ from 'jquery';

import { classes, paths } from './constants';

type IUserCache = Map<IGitlabUser['id'], Promise<IGitlabUser>>;

export async function setupMrList ($mrList: JQuery<Element>) {
  const users: IUserCache = new Map();

  const items = $mrList.find(paths.mrListItem).toArray().map((el) => $(el));

  const operations = items.map(($listItem) => addAvatarToMrItem({ $listItem, users }));

  return Promise.all(operations);
}

async function addAvatarToMrItem ({ $listItem, users }: {
  $listItem: JQuery<Element>;
  users: IUserCache
}) {
  const userId = $listItem.find(paths.mrListItemAuthor).attr('data-user-id')!;

  const user = await (async () => {
    if (users.has(userId)) { return users.get(userId)!; }

    const userPromise = fetchUser({ userId });

    users.set(userId, userPromise);

    return userPromise;
  })();

  const $avatar = $(`<img
    src="${user.avatar_url}"
    width="50" height="50"
    alt="user avatar"
    data-src="${user.avatar_url}"
    class="avatar s50 mr-2 ${classes.MrItemAvatar}"
  />`);

  // TODO: add it better than this
  $listItem.prepend($avatar);

  return $avatar;
}

interface IGitlabUser {
  avatar_url: string;
  bio: any;
  created_at: string;
  id: number | string;
  linkedin: string;
  location: any;
  name: string;
  organization: any;
  public_email: string;
  skype: string;
  state: string;
  twitter: string;
  username: string;
  web_url: string;
  website_url: string;
}

async function fetchUser ({ userId }: { userId: IGitlabUser['id'] }) {
  const user: IGitlabUser = await fetch(`/api/v4/users/${userId}`, { headers: { accept: 'application/json' } })
    .then((res) => res.json());

  return user;
}
