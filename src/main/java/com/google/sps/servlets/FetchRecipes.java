package com.google.sps.servlets;

import com.google.cloud.datastore.Datastore;
import com.google.cloud.datastore.DatastoreOptions;
import com.google.cloud.datastore.Entity;
import com.google.cloud.datastore.Query;
import com.google.cloud.datastore.QueryResults;
import com.google.cloud.datastore.StructuredQuery.OrderBy;
import com.google.gson.Gson;
import com.google.sps.data.Recipe;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/fetch-recipes")
public class FetchRecipes extends HttpServlet {

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    Datastore datastore = DatastoreOptions.getDefaultInstance().getService();
    Query<Entity> query = Query.newEntityQueryBuilder().setKind("Recipe").setOrderBy(OrderBy.desc("name")).build();
    QueryResults<Entity> results = datastore.run(query);

    List<Recipe> recipes = new ArrayList<>();
    while (results.hasNext()) {
      Entity entity = results.next();
      String name = entity.getString("name");
      //Key id = entity.getKey();
      Long timestamp = entity.getLong("timestamp");
      String steps = entity.getString("steps");
      String imageUrl = entity.getString("imageURL");
      String tags = entity.getString("tags");
      String ingredients = entity.getString("ingredients");
      
      Recipe recipe = new Recipe( name, timestamp,imageUrl, steps, ingredients, tags);
      recipes.add(recipe);
    }
    
    Gson gson = new Gson();
    response.setContentType("application/json;");
    response.getWriter().println(gson.toJson(recipes));
  }

}
