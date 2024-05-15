import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import { colors } from "../../theme/theme";
import HeaderLogo from "../../components/HeaderLogo";
import TrendingNews from "../../components/TrendingNews";
import BottomOptions from "../../components/BottomOptions";

const { fontScale } = Dimensions.get("window");

const AboutUs = () => {
  return (
    <>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <HeaderLogo />

        <View style={styles.subContainer}>
          <Image
            source={require("../../../assets/images/about.jpg")}
            style={styles.aboutImage}
          />

          <Text style={styles.title}>About Us</Text>

          <Text style={styles.text}>
            Our mission is simple yet powerful: We, the members of Go Green Stay
            Clean, are united in our commitment to providing a modern and
            inclusive approach to recovery for individuals seeking freedom from
            addiction and bad habits. Our program, is inspired by the principles
            of Alcoholics Anonymous (AA) & (NA) but not sanctioned by either.
          </Text>
          <Text style={styles.text}>
            Go Green Stay Clean (GG) embraces the use of medical cannabis as a
            tool for healing and self-discovery. Our mission is to create a
            supportive and non-judgmental community where individuals struggling
            with addiction can find empowerment and hope. We recognize that
            addiction is a complex and multifaceted challenge, and we believe
            that recovery should be equally multifaceted.
          </Text>

          <Text style={styles.title}>On a Mission</Text>

          <Text style={styles.text}>
            Key Principles of Go Green Stay Clean (GG): Compassion and
            Understanding: We foster a culture of empathy and understanding,
            recognizing that each person's journey towards recovery is unique.
            We offer a non-judgmental space for individuals to share their
            experiences and seek guidance.
          </Text>
          <Text style={styles.text}>
            Personal Growth: We encourage personal growth and self-awareness as
            fundamental aspects of recovery. Understanding the responsible use
            of medical cannabis and other holistic approaches may be helpful in
            the recovery process.
          </Text>
          <Text style={styles.text}>
            Community Support: Go Green Stay Clean (GG) is built on the
            foundation of community support. We believe in the power of
            connection and the strength that comes from sharing our stories and
            struggles with one another. GG Provides Weekly Zoom and in-person
            community support meetings.
          </Text>
          <Text style={styles.text}>
            Education and Awareness: We provide education on the potential
            benefits and risks of medical cannabis use, empowering our members
            to make informed decisions about their recovery journey. We support
            responsible and legal cannabis use.
          </Text>
          <Text style={styles.text}>
            Holistic Healing: We embrace a holistic approach to recovery,
            recognizing that mental, emotional, and spiritual well-being are as
            important as physical health. Our principles incorporate
            mindfulness, meditation, and other complementary practices to
            support overall wellness.
          </Text>
          <Text style={styles.text}>
            Inclusivity: We welcome individuals of all backgrounds, genders, and
            identities. Our program is open to anyone seeking a better life,
            regardless of their previous experiences or paths taken.
          </Text>
          <Text style={styles.text}>
            Freedom: Participation in Go Green Stay Clean (GG) is voluntary, and
            we respect each member's autonomy in choosing recovery methods. We
            do not coerce or pressure anyone to use medical cannabis or any
            other substance.
          </Text>
          <Text style={styles.text}>
            Through these guiding principles, Go Green Stay Clean (GG) strives
            to empower individuals to overcome addiction, regain control of
            their lives, and find a path to lasting recovery. We believe that
            everyone deserves a chance at redemption and a brighter future, and
            we are dedicated to providing the support and resources needed to
            achieve a clean and happy life.
          </Text>
        </View>
        <View style={{ marginTop: 25 }}>
          <TrendingNews />
        </View>
      </ScrollView>

      <BottomOptions />
    </>
  );
};

export default AboutUs;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  subContainer: { marginHorizontal: 20, marginTop: 15 },
  aboutImage: {
    height: 225,
    width: "100%",
    borderRadius: 20,
    resizeMode: "contain",
  },
  title: {
    fontSize: 24 / fontScale,
    color: colors.textColor,
    fontWeight: "700",
    marginTop: 20,
  },
  text: {
    color: "rgba(51,51,51, 0.9)",
    fontSize: 16 * fontScale,
    fontWeight: "400",
    marginTop: 15,
    lineHeight: 20,
  },
});
