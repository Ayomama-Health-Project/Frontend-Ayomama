import { Ionicons } from "@expo/vector-icons";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import {
  InputField,
  Label,
  PickerField,
  StepHeading,
} from "../pregnantMotherOnboarding/shared";

function EmergencyContactCard({
  contact,
  index,
  totalContacts,
  updateEmergencyContact,
  onOpenRelationship,
  removeEmergencyContact,
}) {
  return (
    <View className="rounded-[18px] border border-white/70 bg-white/70 p-4">
      <View className="mb-4 flex-row items-center justify-between">
        <View className="flex-row items-center">
          <View className="h-8 w-8 items-center justify-center rounded-full bg-[#006D5B]">
            <Text className="text-[13px] font-semibold text-white">{index + 1}</Text>
          </View>
          <Text className="ml-3 text-[15px] font-semibold text-[#293231]">
            Emergency Contact {index + 1}
          </Text>
        </View>

        {totalContacts > 1 ? (
          <TouchableOpacity
            activeOpacity={0.86}
            onPress={() => removeEmergencyContact(index)}
            className="h-8 w-8 items-center justify-center rounded-full bg-[#F6E3DA]"
          >
            <Ionicons name="trash-outline" size={16} color="#C65B37" />
          </TouchableOpacity>
        ) : null}
      </View>

      <View className="gap-[5px]">
        <Label>Phone Number</Label>
        <View className="h-[49px] flex-row rounded-[15px] border border-white bg-white">
          <View className="h-full w-[69px] items-center justify-center rounded-l-[15px] bg-[#D9D9D9]">
            <Text className="text-[16px] font-medium text-[#293231]">+234</Text>
          </View>
          <TextInput
            value={contact.phone}
            onChangeText={(value) => updateEmergencyContact(index, "phone", value)}
            placeholder="765489032"
            placeholderTextColor="rgba(41,50,49,0.33)"
            keyboardType="phone-pad"
            className="flex-1 px-4 text-[16px] text-[#293231]"
          />
        </View>
      </View>

      <View className="mt-4 gap-[5px]">
        <Label>Contact Name</Label>
        <InputField
          value={contact.name}
          onChangeText={(value) => updateEmergencyContact(index, "name", value)}
          placeholder="Enter contact name"
        />
      </View>

      <View className="mt-4 gap-[5px]">
        <Label>Relationship</Label>
        <PickerField
          value={contact.relationship}
          placeholder="Family, friend, hospital"
          onPress={() => onOpenRelationship(index)}
        />
      </View>
    </View>
  );
}

export default function EmergencyContactStep({
  emergencyContacts,
  updateEmergencyContact,
  addEmergencyContact,
  removeEmergencyContact,
  onOpenRelationship,
}) {
  return (
    <View className="flex-1">
      <StepHeading title="Emergency contact" subtitle="" />

      <View className="px-5 pt-[29px]">
        <View className="gap-5">
          {emergencyContacts.map((contact, index) => (
            <EmergencyContactCard
              key={index}
              contact={contact}
              index={index}
              totalContacts={emergencyContacts.length}
              updateEmergencyContact={updateEmergencyContact}
              onOpenRelationship={onOpenRelationship}
              removeEmergencyContact={removeEmergencyContact}
            />
          ))}
        </View>

        <TouchableOpacity
          activeOpacity={0.86}
          onPress={addEmergencyContact}
          className="mt-3 flex-row items-center self-start rounded-full bg-white/90 px-3 py-2"
        >
          <Text className="text-[16px] font-medium text-[#293231]">+</Text>
          <Text className="ml-2 text-[13px] font-medium text-[#293231]">
            Add another contact
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
