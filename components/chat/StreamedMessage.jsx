import { useEffect, useRef, useState } from "react";
import { Animated, Text, View } from "react-native";

export default function StreamedMessage({
  content,
  isUser,
  onStreamingChange,
  shouldStream = false, // Only stream if explicitly requested
}) {
  const [displayedText, setDisplayedText] = useState(
    shouldStream ? "" : content
  );
  const [isComplete, setIsComplete] = useState(!shouldStream);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Fade in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    // If not streaming, show content immediately
    if (!shouldStream) {
      setDisplayedText(content);
      setIsComplete(true);
      return;
    }

    // Notify parent that streaming has started
    if (!isUser && onStreamingChange) {
      onStreamingChange(true);
    }

    // Stream text character by character (faster streaming)
    let currentIndex = 0;
    const streamInterval = setInterval(() => {
      if (currentIndex < content.length) {
        // Stream 2 characters at a time for faster display
        const nextIndex = Math.min(currentIndex + 2, content.length);
        setDisplayedText(content.substring(0, nextIndex));
        currentIndex = nextIndex;
      } else {
        setIsComplete(true);
        clearInterval(streamInterval);
        // Notify parent that streaming has ended
        if (!isUser && onStreamingChange) {
          onStreamingChange(false);
        }
      }
    }, 15); // Faster interval (was 20ms, now 15ms)

    return () => {
      clearInterval(streamInterval);
      // Ensure we notify parent when component unmounts
      if (!isUser && onStreamingChange) {
        onStreamingChange(false);
      }
    };
  }, [content, shouldStream]);

  // Parse markdown-style formatting
  const renderFormattedText = (text) => {
    const parts = [];
    let currentText = text;
    let key = 0;

    // Handle bold text **text**
    const boldRegex = /\*\*(.*?)\*\*/g;
    let lastIndex = 0;
    let match;

    while ((match = boldRegex.exec(currentText)) !== null) {
      // Add text before the match
      if (match.index > lastIndex) {
        const beforeText = currentText.substring(lastIndex, match.index);
        parts.push(
          <Text
            key={`normal-${key++}`}
            className={`text-[15.5px] leading-6 ${
              isUser ? "text-white" : "text-[#293231]"
            }`}
          >
            {beforeText}
          </Text>
        );
      }

      // Add bold text
      parts.push(
        <Text
          key={`bold-${key++}`}
          className={`text-[15.5px] leading-6 font-bold ${
            isUser ? "text-white" : "text-[#293231]"
          }`}
        >
          {match[1]}
        </Text>
      );

      lastIndex = match.index + match[0].length;
    }

    // Add remaining text
    if (lastIndex < currentText.length) {
      parts.push(
        <Text
          key={`normal-${key++}`}
          className={`text-[15.5px] leading-6 ${
            isUser ? "text-white" : "text-[#293231]"
          }`}
        >
          {currentText.substring(lastIndex)}
        </Text>
      );
    }

    return parts.length > 0
      ? parts
      : [
          <Text
            key="default"
            className={`text-[15.5px] leading-6 ${
              isUser ? "text-white" : "text-[#293231]"
            }`}
          >
            {currentText}
          </Text>,
        ];
  };

  // Split by newlines to handle paragraphs with better spacing
  const renderContent = () => {
    const paragraphs = displayedText.split("\n\n").filter((p) => p.trim());

    return paragraphs.map((paragraph, index) => {
      // Check if this is a list item
      const isListItem = paragraph.trim().match(/^[\d•\-*]\s/);

      return (
        <View
          key={index}
          className={index > 0 ? "mt-4" : ""}
          style={isListItem ? { paddingLeft: 8 } : {}}
        >
          <Text style={{ lineHeight: 24 }}>
            {renderFormattedText(paragraph)}
          </Text>
        </View>
      );
    });
  };

  return (
    <Animated.View style={{ opacity: fadeAnim }}>
      {renderContent()}
    </Animated.View>
  );
}
