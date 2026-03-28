import { Ionicons } from "@expo/vector-icons";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { useTranslation } from "../../utils/translator";
import {
  InputField,
  Label,
  PickerField,
  StepHeading,
} from "./shared";

function EmergencyContactBlock({
  contact,
  index,
  totalContacts,
  updateEmergencyContact,
  onOpenRelationship,
  removeEmergencyContact,
}) {
  const emergencyContactText = useTranslation("Emergency Contact");
  const phoneNumberText = useTranslation("Phone Number");
  const contactNameText = useTranslation("Contact Name");
  const enterContactNameText = useTranslation("Enter contact name");
  const relationshipText = useTranslation("Relationship");
  const relationshipPlaceholderText = useTranslation("Family, friend, hospital");
  return (
    <View className="rounded-[18px] border border-white/70 bg-white/70 p-4">
      <View className="mb-4 flex-row items-center justify-between">
        <View className="flex-row items-center">
          <View className="h-8 w-8 items-center justify-center rounded-full bg-[#006D5B]">
            <Text className="text-[13px] font-semibold text-white">{index + 1}</Text>
          </View>
          <Text className="ml-3 text-[15px] font-semibold text-[#293231]">
            {emergencyContactText} {index + 1}
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
        <Label>{phoneNumberText}</Label>
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
        <Label>{contactNameText}</Label>
        <InputField
          value={contact.name}
          onChangeText={(value) => updateEmergencyContact(index, "name", value)}
          placeholder={enterContactNameText}
        />
      </View>

      <View className="mt-4 gap-[5px]">
        <Label>{relationshipText}</Label>
        <PickerField
          value={contact.relationship}
          placeholder={relationshipPlaceholderText}
          onPress={() => onOpenRelationship(index)}
        />
      </View>
    </View>
  );
}

export default function PersonalInfoStep({
  fullName,
  setFullName,
  address,
  setAddress,
  emergencyContacts,
  updateEmergencyContact,
  addEmergencyContact,
  onOpenRelationship,
  removeEmergencyContact,
}) {
  const titleText = useTranslation("Personal information");
  const fullNameText = useTranslation("Full Name");
  const enterFullNameText = useTranslation("Enter full name");
  const homeAddressText = useTranslation("Home Address");
  const enterHomeAddressText = useTranslation("Enter home address");
  const emergencyContactText = useTranslation("Emergency contact");
  const addAnotherContactText = useTranslation("Add another contact");
  return (
    <View className="flex-1">
      <StepHeading title={titleText} subtitle="" />

      <View className="px-5 pt-[17px]">
        <View className="gap-[19px]">
          <View className="gap-[5px]">
            <Label>{fullNameText}</Label>
            <InputField
              value={fullName}
              onChangeText={setFullName}
              placeholder={enterFullNameText}
            />
          </View>

          <View className="gap-[5px]">
            <Label>{homeAddressText}</Label>
            <InputField
              value={address}
              onChangeText={setAddress}
              placeholder={enterHomeAddressText}
            />
          </View>

          <View className="gap-[7px]">
            <Label dark>{emergencyContactText}</Label>

            <View className="gap-5">
              {emergencyContacts.map((contact, index) => (
                <EmergencyContactBlock
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
          </View>
        </View>

        <TouchableOpacity
          activeOpacity={0.86}
          onPress={addEmergencyContact}
          className="mt-3 flex-row items-center self-start rounded-full bg-white/90 px-3 py-2"
        >
          <Text className="text-[16px] font-medium text-[#293231]">+</Text>
          <Text className="ml-2 text-[13px] font-medium text-[#293231]">
            {addAnotherContactText}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
