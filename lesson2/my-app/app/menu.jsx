import { StyleSheet, Appearance, Platform, SafeAreaView, ScrollView, FlatList, View, Text, Image } from "react-native";
import { Colors } from "@/constants/Colors";
import { MENU_ITEMS } from "@/constants/MenuItems";
import MENU_IMAGES from "../constants/MenuImages";

export default function MenuScreen() {
  const colorScheme = Appearance.getColorScheme();
  const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;
  const styles = createStyles(theme, colorScheme);

  const Container = Platform.OS === 'web' ? ScrollView : SafeAreaView;

  return (
    <Container style={styles.container}>
      <Text style={styles.pageTitle}>Menu</Text>

      <FlatList
        data={MENU_ITEMS}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListHeaderComponent={<Text style={styles.headerComp}>Top of Menu</Text>}
        ListFooterComponent={<Text style={styles.footerComp}>End of Menu</Text>}
        ListEmptyComponent={<Text style={styles.emptyText}>No items available</Text>}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image style={styles.menuImage} source={MENU_IMAGES[item.id - 1]} />
            <View style={styles.menuTextContainer}>
              <Text style={styles.menuItemTitle}>{item.title}</Text>
              <Text style={styles.menuItemDescription}>{item.description}</Text>
            </View>
          </View>
        )}
      />
    </Container>
  );
}

function createStyles(theme, colorScheme) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    pageTitle: {
      fontSize: 32,
      fontWeight: 'bold',
      color: theme.text,
      textAlign: 'center',
      marginVertical: 20,
    },
    contentContainer: {
      paddingBottom: 20,
      paddingHorizontal: 16,
    },
    separator: {
      height: 10,
    },
    headerComp: {
      fontSize: 24,
      fontWeight: '600',
      color: theme.text,
      textAlign: 'center',
      marginVertical: 10,
    },
    footerComp: {
      fontSize: 18,
      color: theme.text,
      textAlign: 'center',
      marginVertical: 10,
    },
    emptyText: {
      fontSize: 18,
      color: theme.text,
      textAlign: 'center',
      marginTop: 20,
    },
    card: {
      flexDirection: 'row',
      backgroundColor: colorScheme === 'dark' ? '#333' : '#fff',
      borderRadius: 15,
      padding: 10,
      marginVertical: 8,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 5,
      alignItems: 'center',
    },
    menuImage: {
      width: 80,
      height: 80,
      borderRadius: 10,
      marginRight: 10,
    },
    menuTextContainer: {
      flex: 1,
    },
    menuItemTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: theme.text,
      marginBottom: 4,
    },
    menuItemDescription: {
      fontSize: 16,
      color: theme.textSecondary || '#888',
    },
  });
}
