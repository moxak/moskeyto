import { Box, Button, Group, List, Text, Title } from "@mantine/core";
import { BookmarkListForm } from "../components/BookmarkListForm";
import { BookmarkListItem } from "../components/BookmarkListItem";
import { useBookmarkData } from "../hooks/UseBookmarkData";
import { useKeywordData } from "../hooks/UseKeywordData";


export const Bookmarks: React.FC = () => {
  
  const { keyword, handleChangeKeyword } = useKeywordData();
  const { bookmarks } = useBookmarkData(keyword);
  
  return (
    <>
      <BookmarkListForm onChange={handleChangeKeyword} />
      {bookmarks.length > 0 && (
        <List sx={{ listStyle: "inside" }} mt="md">
          {bookmarks.map((bookmark) => (
            <BookmarkListItem key={bookmark.url} bookmark={bookmark} />
          ))}
        </List>
      )}
    </>
    
  )
}