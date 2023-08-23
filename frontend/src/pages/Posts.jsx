import React from "react";
import Header from "../components/Header";
import PostCard from "../components/Posts/PostCard";

const Posts = () => {
 const posts = [
  {
   id: "1",
   imageUrl:
    "https://scontent.fdac31-1.fna.fbcdn.net/v/t39.30808-6/367476967_677384967750380_3734878373982405749_n.jpg?stp=dst-jpg_p526x296&_nc_cat=1&ccb=1-7&_nc_sid=7f8c78&_nc_ohc=OLXS2126kSEAX9UTrCm&_nc_ht=scontent.fdac31-1.fna&oh=00_AfA9SpXtHZyhYX6DTyd_33mrGCPNyEWGq6hOiEzA1B_5UQ&oe=64E0CDC9",
   caption: "India ends the West Indies tour with more wins.",
   writer: "CricTracker",
   time: "15/08/23",
   reactionCount: 15000,
   commentCount: 978,
  },
  {
   id: "1",
   imageUrl:
    "https://scontent.fdac31-1.fna.fbcdn.net/v/t39.30808-6/367476967_677384967750380_3734878373982405749_n.jpg?stp=dst-jpg_p526x296&_nc_cat=1&ccb=1-7&_nc_sid=7f8c78&_nc_ohc=OLXS2126kSEAX9UTrCm&_nc_ht=scontent.fdac31-1.fna&oh=00_AfA9SpXtHZyhYX6DTyd_33mrGCPNyEWGq6hOiEzA1B_5UQ&oe=64E0CDC9",
   caption: "India ends the West Indies tour with more wins.",
   writer: "CricTracker",
   time: "15/08/23",
   reactionCount: 15000,
   commentCount: 978,
  },
  {
   id: "1",
   imageUrl:
    "https://scontent.fdac31-1.fna.fbcdn.net/v/t39.30808-6/367476967_677384967750380_3734878373982405749_n.jpg?stp=dst-jpg_p526x296&_nc_cat=1&ccb=1-7&_nc_sid=7f8c78&_nc_ohc=OLXS2126kSEAX9UTrCm&_nc_ht=scontent.fdac31-1.fna&oh=00_AfA9SpXtHZyhYX6DTyd_33mrGCPNyEWGq6hOiEzA1B_5UQ&oe=64E0CDC9",
   caption: "India ends the West Indies tour with more wins.",
   writer: "CricTracker",
   time: "15/08/23",
   reactionCount: 15000,
   commentCount: 978,
  },
 ];
 return (
  <>
   <Header />
   <div className="flex justify-center items-center">
    <div className="w-4/12">
     {posts.map((post, index) => (
      <div>
       <PostCard
        id={post.id}
        imageUrl={post.imageUrl}
        caption={post.caption}
        writer={post.writer}
        time={post.time}
        reactionCount={post.reactionCount}
        commentCount={post.commentCount}
       />
      </div>
     ))}
    </div>
   </div>
  </>
 );
};

export default Posts;
