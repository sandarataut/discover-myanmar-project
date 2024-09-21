import { Text } from "components/ui";
import { Image } from "expo-image";
import { Stack } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import React from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MyanmarFactsPage() {
  return (
    <SafeAreaView
      edges={["bottom", "right", "left"]}
      className="flex-1 bg-white">
      <Stack.Screen options={{ headerTitle: "Myanmar Facts" }} />
      <ScrollView
        contentContainerClassName="py-4"
        showsVerticalScrollIndicator={false}>
        <Text className="text-base px-4">
          Myanmar is the biggest country in mainland Southeast Asia. Home to
          over 135 different ethnic groups, the country is culturally rich and
          diverse, however, the majority of people living in Myanmar (90 per
          cent) identify as Buddist. Curious to learn more about this
          fascinating country? Here are some of the most interesting facts about
          Myanmar.
        </Text>
        <View className="mt-4 gap-4">
          {facts.map((fact, i) => (
            <FactItem
              key={i}
              title={fact.title}
              content={fact.content}
              image={fact.image}
            />
          ))}
        </View>
        <Text className="text-lg mb-2 mt-5 px-4 font-Poppins600">
          Places to visit
        </Text>
        <ScrollView
          contentContainerClassName="gap-3 pb-4 px-4"
          horizontal
          showsHorizontalScrollIndicator={false}>
          {places.map((place, i) => (
            <PlaceItem
              key={i}
              title={place.title}
              highlight={place.highlight}
              image={place.image}
              link={place.link}
            />
          ))}
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
}

const FactItem = ({ image, title, content }: Fact) => (
  <View className="gap-2.5 px-4">
    <Text className="text-lg font-Poppins500 text-red-500">{title}</Text>
    <Image
      style={{ width: "100%", height: 200, borderRadius: 8 }}
      source={image}
    />
    <Text className="text-base font-Poppins500">{content}</Text>
  </View>
);

const PlaceItem = ({ image, title, highlight, link }: Place) => (
  <TouchableOpacity
    onPress={() => WebBrowser.openBrowserAsync(link)}
    activeOpacity={0.7}
    className="w-[200px] bg-white shadow-lg border-[0.5px] pb-2 border-secondary overflow-hidden rounded-lg">
    <Image style={{ height: 220 }} source={image} />
    <Text className="text-lg font-Poppins500 px-2 mt-2 text-red-500">
      {title}
    </Text>
    <Text numberOfLines={4} className="mt-1 px-2 font-Poppins500">
      {highlight}
    </Text>
  </TouchableOpacity>
);

type Fact = (typeof facts)[number];

const facts = [
  {
    image: require("../../assets/facts/myanmar_shares_borders_with_five_countries_large_1024.webp"),
    title: "1. Myanmar shares borders with five countries",
    content:
      "Myanmar is the largest country in mainland Southeast Asia and the 39th biggest country in the world. The Asian country shares borders with Thailand, Laos, China, India and Bangladesh. It has a coastline on the Andaman Sea and the Bay of Bengal. As of 2022, the population of Myanmar is 55,030,431. It ranks number 26 in the list of countries (and dependencies) by population."
  },
  {
    image:
      "https://cdn.enjoytravel.com/img/Big7Enjoy/en/travel-news/interesting-facts/facts-about-myanmar/myanmar_was_previously_called_burma_large_1024.webp",
    title: "2. Myanmar was previously called Burma",
    content:
      "Burma was the name of the country until 1989. The ruling Military Junta changed the country’s name to ‘The Republic of the Union of Myanmar’. Due to the violent history of the military in Burma, many governments around the world refused to recognise the new name, Myanmar. Gradually, over time, the name was accepted and is in use today. However, the people of Myanmar are still known as Burmese."
  },
  {
    image:
      "https://cdn.enjoytravel.com/img/Big7Enjoy/en/travel-news/interesting-facts/facts-about-myanmar/the_japanese_invaded_burma_large_1024.webp",
    title: "3. The Japanese invaded Burma",
    content:
      "The British colonised Burma in 1824. Under British rule, the country was called British Burma. Britain ruled the country until the Second World War. In January 1942, the Japanese Army invaded Burma as Japan wanted to cut the Burma Road, which was the one remaining land supply route to China. The Empire of Japan occupied Burma until 1945. Burma achieved its independence from Britain on the 4th of January 1948."
  },
  {
    image:
      "https://cdn.enjoytravel.com/img/Big7Enjoy/en/travel-news/interesting-facts/facts-about-myanmar/naypyidaw_is_the_capital_of_myanmar_large_1024.webp",
    title: "4. Naypyidaw is the capital of Myanmar",
    content:
      "Yangon, aka Rangoon, is the largest city of Myanmar and capital of the Yangon Region. Yangon was the capital of independent Myanmar from 1948 to 2006. In 2006, the government proclaimed the new city of Nay Pyi Taw (Naypyidaw) the new capital of the country. Workers started construction of the new city of Naypyidaw in 2002 and completed it by 2012. In the Burmese language, the name Naypyidaw means “abode of the king”."
  },
  {
    image:
      "https://cdn.enjoytravel.com/img/Big7Enjoy/en/travel-news/interesting-facts/facts-about-myanmar/there_are_135_ethnic_groups_in_burma_large_1024.webp",
    title: "5. There are 135 ethnic groups in Burma",
    content:
      "Around 135 ethnic groups call Burma home. This includes many hill tribes each with its own culture and customs. The Burmese government identifies eight categories of ‘major national ethnic races’. These are Kachin, Kayah, Kayin, Chin, Mon, Bamar, Rakhine, Shan. Apart from Bamar, each major national ethnic race has its own state of the same name. The Moken nomadic people live in Myanmar but are not on the list. The Burmese government doesn’t recognise the Rohingya. This ethnic community from Rakhine State in the west of Myanmar are predominantly Muslim and the Buddhist-majority government have denied them citizenship for more than four decades."
  },
  {
    image:
      "https://cdn.enjoytravel.com/img/Big7Enjoy/en/travel-news/interesting-facts/facts-about-myanmar/the_golden_pagoda_is_in_myanmar_large_1024.webp",
    title: "6. The Golden Pagoda is in Myanmar",
    content:
      "The iconic Shwedagon Pagoda (Shwedagon Zedi Daw) in Yangon is the oldest and the most visited Buddhist temple in Myanmar. Constructed around 2,500 years ago, the temple soars to a height of 110 metres high and features over 60 tonnes of gold that covers the interiors and stupas, hence its nickname, the Golden Pagoda. A stupa is a shrine containing the remains of a holy person and/or relics. The Shwedagon is the most sacred Buddhist pagoda in Myanmar. Buddhist believe it contains the relics of the four previous Buddhas of the present Kalpa, for instance, Buddha’s hair."
  },
  {
    image:
      "https://cdn.enjoytravel.com/img/Big7Enjoy/en/travel-news/interesting-facts/facts-about-myanmar/myanmar_uses_the_imperial_measurement_system_large_1024.webp",
    title: "7. Myanmar uses the imperial measurement system",
    content:
      "Myanmar does not use the metric system of measurement – the International System of Units (SI). The country still uses the imperial measurement system. It is one of just three countries in the whole world that do not use the metric system. The other two countries that still use the imperial measurement system are the United States of America and Liberia. The American Colonization Society founded Liberia and because of Liberia’s close association with the United States, the country still uses the imperial measurement system."
  }
];

type Place = (typeof places)[number];

const places = [
  {
    image: require("../../assets/places/bagan.jpg"),
    title: "Bagan",
    highlight: "Thousands of temples and pagodas.",
    link: "https://en.wikipedia.org/wiki/Bagan"
  },
  {
    image: require("../../assets/places/inle_lake.png"),
    title: "Inle Lake",
    highlight: "Floating villages, unique local fishing techniques.",
    link: "https://en.wikipedia.org/wiki/Inle_Lake"
  },
  {
    image: require("../../assets/places/kyaiktiyo.jpeg"),
    title: "Kyaiktiyo Pagoda",
    highlight: "Sacred pilgrimage site.",
    link: "https://en.wikipedia.org/wiki/Kyaiktiyo_Pagoda"
  },
  {
    image: require("../../assets/places/ngapali.jpg"),
    title: "Ngapali Beach",
    highlight: "Relaxing, snorkeling, and beach activities.",
    link: "https://en.wikipedia.org/wiki/Thandwe"
  },
  {
    image: require("../../assets/places/yangon.jpg"),
    title: "Yangon",
    highlight: "Shwedagon Pagoda, colonial architecture.",
    link: "https://en.wikipedia.org/wiki/Yangon"
  }
];
