const Notif = require("../models/notification");

module.exports = class Notification {
  constructor({ recipient, sender, postId, postReact }) {
    this.sender = sender;
    this.recipient = recipient;
    this.postId = postId;
    this.postReact = postReact;
  }

  async createNotifcation({ content, type, path }) {
    let newNotif = null;

    if (this.recipient._id.toString().includes(this.sender?._id.toString()))  return;
    
    newNotif = await Notif.create({
      sender: this.sender?._id,
      recipient: this.recipient?._id,
      type,
      url: path,
      content,
    });
    await newNotif.save();
    return newNotif;
  }

  async PostLike() {
    const path = `/${this.recipient?.username}/posts/${this.postId}`;
    const noti = await this.createNotifcation({
      content: `${this.sender?.firstName} reacted by like on your post`,
      type: "react",
      path: path,
    });
    return noti;
  }

  async PostComment() {
    const path = `/${this.recipient?.username}/posts/${this.postId}`;
    const noti = await this.createNotifcation({
      content: `${this.sender?.firstName} commented ${this.postReact} on your post`,
      type: "comment",
      path: path,
    });
    return noti;
  }

  async CommentLike() {
    const path = `/${this.recipient?.username}/posts/${this.postId}`;
    const noti = await this.createNotifcation({
      content: `${this.sender?.firstName}  like your comment`,
      type: "react",
      path: path,
    });
    return noti;
  }

  async CommentReplie() {
    const postLink = `${process.env.FRONTEND_URL}/${this.recipient?.username}/posts/${this.postId}`;
    const path = `/${this.recipient?.username}/posts/${this.postId}`;

    const noti = await this.createNotifcation({
      content: `${this.sender?.firstName} replied ${this.postReact} on your comment`,
      click: postLink,
      type: "comment",
      path: path,
    });
    return noti;
  }

  async FriendRequest() {
    const path = `/profile/${this.sender?.username}`;
    const noti = await this.createNotifcation({
      content: `${this.sender?.firstName} Sent you a friend request`,
      type: "friend",
      path: path,
    });
    return noti;
  }

  async AcceptFriendRequest() {
    const path = `/profile/${this.sender?.username}`;
    const noti = await this.createNotifcation({
      content: `${this.sender?.firstName} Accept your friend request`,
      type: "friend",
      path: path,
    });
    return noti;
  }
};
