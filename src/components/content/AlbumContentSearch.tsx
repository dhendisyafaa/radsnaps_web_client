import AlbumGridView from "../album/AlbumGridView";
import EmptyStateComponent from "../common/EmptyStateComponent";

export default function AlbumContentSearch({ content }) {
  return content.length !== 0 ? (
    <AlbumGridView
      albums={content}
      className={
        "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3"
      }
    />
  ) : (
    <EmptyStateComponent
      illustration={"/assets/svg/empty-album.svg"}
      titleMessage={"No albums have been created yet"}
      descriptionMessage={"Create an album and photos can be put in it"}
      withButton={false}
    />
  );
}
