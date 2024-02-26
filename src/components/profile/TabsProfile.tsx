import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AlbumsByUser from "./tabs/AlbumsByUser";
import LikesByUser from "./tabs/LikesByUser";
import PostsByUser from "./tabs/PostsByUser";

export default function TabsProfile({ userId }) {
  const TAB_LIST = [
    {
      title: "Posts",
      value: "post",
      content: <PostsByUser userId={userId} />,
    },
    {
      title: "Your Album",
      value: "yourAlbum",
      content: <AlbumsByUser userId={userId} />,
    },
    {
      title: "Likes",
      value: "likes",
      content: <LikesByUser userId={userId} />,
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
