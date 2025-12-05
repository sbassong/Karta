import { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { styles } from "./styles"

const STATUS_OPTIONS = [
  { label: "Functioning", value: "FUNCTIONAL", color: "#4CAF50" },
  { label: "Broken / Defect", value: "BROKEN", color: "#F44336" }, 
  { label: "No Access", value: "CLOSED", color: "#FF9800" },
];

export default function ReportModal({ visible, onClose, onSubmit, poiName }) {
  const [selectedStatus, setSelectedStatus] = useState("BROKEN");
  const [note, setNote] = useState("");

  const handleSubmit = () => {
    onSubmit({ status: selectedStatus, note });
    setNote("");
    setSelectedStatus("BROKEN");
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "undefined"}
        style={styles.centeredView}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Report Issue</Text>
          <Text style={styles.modalSubtitle}>for {poiName}</Text>

          {/* Status chips */}
          <Text style={styles.label}>What is the status?</Text>
          <View style={styles.chipContainer}>
            {STATUS_OPTIONS.map((option) => (
              <Pressable
                key={option.value}
                style={[
                  styles.chip,
                  selectedStatus === option.value && {
                    backgroundColor: option.color,
                    borderColor: option.color,
                  },
                ]}
                onPress={() => setSelectedStatus(option.value)}
              >
                <Text
                  style={[
                    styles.chipText,
                    selectedStatus === option.value && { color: "white" },
                  ]}
                >
                  {option.label}
                </Text>
              </Pressable>
            ))}
          </View>

          <Text style={styles.label}>Additional Details (Optional)</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. Handle missing, water dirty..."
            value={note}
            onChangeText={setNote}
            multiline
            numberOfLines={3}
          />

          {/* action buttons */}
          <View style={styles.buttonRow}>
            <Pressable
              style={[styles.button, styles.cancelBtn]}
              onPress={onClose}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </Pressable>

            <Pressable
              style={[styles.button, styles.submitBtn]}
              onPress={handleSubmit}
            >
              <Text style={styles.submitText}>Submit Report</Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
