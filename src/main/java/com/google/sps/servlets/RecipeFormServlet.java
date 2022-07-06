package com.google.sps.servlets;

import com.google.cloud.datastore.Datastore;
import com.google.cloud.datastore.DatastoreOptions;
import com.google.cloud.datastore.Entity;
import com.google.cloud.datastore.FullEntity;
import com.google.cloud.datastore.IncompleteKey;
import com.google.cloud.datastore.KeyFactory;
import java.io.IOException;
import java.util.Arrays;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.jsoup.Jsoup;
import org.jsoup.safety.Safelist;

@WebServlet("/form-handler")
public class RecipeFormServlet extends HttpServlet {

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {

    // Get the value entered in the form.
    String[] steps = request.getParameterValues("recipe-step[]");
    String[] ingredients = request.getParameterValues("ingredient[]");
    String name = Jsoup.clean(request.getParameter("recipe-name"), Safelist.none());
    long timestamp = System.currentTimeMillis();

    Datastore datastore = DatastoreOptions.getDefaultInstance().getService();
    KeyFactory keyFactory = datastore.newKeyFactory().setKind("Recipe");
    FullEntity<IncompleteKey> taskEntity =
        Entity.newBuilder(keyFactory.newKey())
            .set("steps", Arrays.toString(steps))
            .set("ingredients", Arrays.toString(ingredients))
            .set("name", name)
            .set("timestamp", timestamp)
            .build();
    datastore.put(taskEntity);

    // Print the value so you can see it in the server logs.
    System.out.println("Name: " + name + " steps: " + Arrays.toString(steps) + " ingedients: " + Arrays.toString(ingredients));

    // Write the value to the response so the user can see it.
    response.getWriter().println("Name: " + name + " steps: " + Arrays.toString(steps) + " ingedients: " + Arrays.toString(ingredients));

    // response.sendRedirect("/index.html")

  }

}