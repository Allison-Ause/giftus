import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from '@react-18-pdf/renderer';

export default function PDF() {
  const styles = StyleSheet.create({
    page: {
      flexDirection: 'column',
      backgroundColor: '#ffffff',
    },
    section: {
      margin: 10,
      padding: 10,
    },
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>Giftus Gift List</Text>
        </View>
      </Page>
    </Document>
  );
}
