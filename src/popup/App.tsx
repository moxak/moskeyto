import {
  Anchor,
  Box,
  Container,
  Divider,
  Group,
  MantineProvider,
  Text,
  Title,
} from "@mantine/core";
import { commonValue, targetUrls } from "../CommonValue";
import React, { useEffect, useState } from 'react';
import { Bookmarks } from './pages/Bookmarks';
import AppIcon from '/public/icon/icon.svg';
import { useRef } from 'react';

export const App: React.FC = () => {
  const [isAltPressed, setIsAltPressed] = useState(false);
  const linkRefs:any = useRef([]);

  useEffect(() => {
    const handleKeyDown = (e:any) => {
      if (e.altKey && !isNaN(parseInt(e.key))) {
        // Alt + 数字キーが押された場合
        const index = parseInt(e.key) - 1;
        if (linkRefs.current[index]) {
          window.open(linkRefs.current[index].href, '_blank');
        }
      } else if (e.key === 'Alt') {
        setIsAltPressed(true);
      } else if (e.key === 'j' && isAltPressed) {
        // Altキーが押されている状態で、"j"キーが押された場合
        if (linkRefs.current[0]) {
          window.open(linkRefs.current[0].href, '_blank');
        }
        console.log(linkRefs);
        console.log('Alt + j');
      }
      // テキスト入力エリアである場合、イベントを無視する
      if (e.target?.tagName === 'INPUT' || e.target?.tagName === 'TEXTAREA') {
        return;
      }

    };

    const handleKeyUp = (e:any) => {
      if (e.key === 'Alt') {
        setIsAltPressed(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };

  }, [isAltPressed]);

  return (
    <MantineProvider withGlobalStyles={false} withNormalizeCSS={true}>
      <Container size={600}>
        <header>
          <Group>
            <img 
              src={AppIcon} 
              alt={commonValue.appName} 
              style={{ width: '48px', height: '48px' }}
            />
            <Title order={2}>{commonValue.appName}</Title>
          </Group>
          <Box fz="sm">
            <Text>{commonValue.appDescription}</Text>
          </Box>
        </header>
        <Divider my="sm" />
        <Bookmarks linkRefs={linkRefs} />
        <Divider my="sm" />
        <footer>
          <Group position="center">
            <Anchor
              href={commonValue.appGithubUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Github
            </Anchor>
          </Group>
        </footer>
      </Container>
    </MantineProvider>
  );
};

