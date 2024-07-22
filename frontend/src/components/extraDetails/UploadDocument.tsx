import React, { FC, useState } from 'react'
import { View, Button, Text, StyleSheet } from 'react-native'
import * as DocumentPicker from 'expo-document-picker'

interface UploadDocumentProps {
  title: string
  setSelectedDocument: (selectedDocument: any) => void
  selectedDocument: any
}

const UploadDocument: FC<UploadDocumentProps> = ({
  title,
  setSelectedDocument,
  selectedDocument
}) => {

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync()
      if (result.assets) {
        const asset = result.assets[0] 
        setSelectedDocument(asset)
      } else {
        console.log('Document pick cancelled')
      }
    } catch (err) {
      console.error('Error picking document:', err)
    }
  }

  return (
    <View>
      <Button title={title} onPress={pickDocument} />
      {selectedDocument && (
        <View>
          <Text style={styles.documentText}>
            {selectedDocument && 
              'Uploaded File: ' + selectedDocument.name.substring(0, 25) + '...'
            }
          </Text>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  documentText: {
    fontSize: 16,
  },
})

export default UploadDocument
