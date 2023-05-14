import { Anchor, Badge, Group, List, Text, Title } from "@mantine/core";
import { BookmarkItem } from "../types/BookmarkData";

type Props = {
  bookmark: BookmarkItem;
};


export const BookmarkListItem: React.FC<Props> = ({ bookmark }) => {

  return (
    <List.Item>
      <Title order={4}>
        <Anchor href={bookmark.url} target="_blank" rel="noopener noreferrer">
          {bookmark.title}
        </Anchor>
      </Title>
      <Group>
        {bookmark.category?.map((category) => (
        <Badge fz="sm" color='blue.5'>{category}</Badge>
        ))}
      </Group>
    </List.Item>
  );
};
