package com.google.sps.data;

import java.util.ArrayList;

public class Recipe {

  // private String id;
  private String name;
  private Long timestamp;
  private String imageUrl;
  private String steps;
  private String ingredients;
  private String tags;

  public Recipe(String name, Long timestamp,String imageUrl,String steps,
      String ingredients,
      String tags) {
    this.name = name;
    this.timestamp = timestamp;
    this.imageUrl = imageUrl;
    this.steps = steps;
    this.ingredients = ingredients;
    this.tags = tags;
    // this.id = id;
   // List<String> steps = Arrays.asList(steps_.substring(1, steps_.length() - 1).split(", "));
    //List<String> ingredients = Arrays.asList(ingredients_.substring(1, ingredients_.length() - 1).split(", "));
    //List<String> tags = Arrays.asList(tags_.substring(1, tags_.length() - 1).split(", "));

    //steps.forEach(step -> steps.add(step));
    //ingredients.forEach(ingredient -> ingredients.add(ingredient));
    //tags.forEach(tag -> tags.add(tag));
   
  }

}
