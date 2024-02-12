import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AlbumsByUser from "./tabs/AlbumsByUser";
import LikesByUser from "./tabs/LikesByUser";
import PostsByUser from "./tabs/PostsByUser";

export default function TabsProfile({ user_id }) {
  const TAB_LIST = [
    {
      title: "Posts",
      value: "post",
      content: <PostsByUser user_id={user_id} />,
    },
    {
      title: "Your Album",
      value: "yourAlbum",
      content: <AlbumsByUser user_id={user_id} />,
    },
    {
      title: "Likes",
      value: "likes",
      content: <LikesByUser user_id={user_id} />,
    },
  ];
  return (
    <Tabs defaultValue="post">
      <TabsList className="w-full grid grid-cols-3">
        {TAB_LIST.map((tab, i) => (
          <TabsTrigger key={i} value={tab.value}>
            {tab.title}
          </TabsTrigger>
        ))}
      </TabsList>
      {TAB_LIST.map((tab, i) => (
        <TabsContent key={i} value={tab.value}>
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
}
