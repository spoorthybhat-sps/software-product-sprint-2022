package com.google.sps.servlets;
import com.google.cloud.datastore.Datastore;
import com.google.cloud.datastore.DatastoreOptions;
import com.google.cloud.datastore.Entity;
import com.google.cloud.datastore.FullEntity;
import com.google.cloud.datastore.IncompleteKey;
import com.google.cloud.datastore.KeyFactory;
import java.io.IOException;
import java.util.Arrays;
import javax.servlet.http.Part;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.jsoup.Jsoup;
import org.jsoup.safety.Safelist;
import com.google.cloud.storage.Blob;
import com.google.cloud.storage.BlobId;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;
import java.io.InputStream;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;

@WebServlet("/form-handler")
@MultipartConfig
public class RecipeFormServlet extends HttpServlet {

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    // Get the value entered in the form.
    String[] steps = request.getParameterValues("recipe-step[]");
    String[] ingredients = request.getParameterValues("ingredient[]");
    String[] tags = request.getParameterValues("tags[]");
    String name = Jsoup.clean(request.getParameter("recipe-name"), Safelist.none());
    long timestamp = System.currentTimeMillis();

    Part filePart = request.getPart("recipe-image");
    String fileName = filePart.getSubmittedFileName() + timestamp;
    InputStream fileInputStream = filePart.getInputStream();
    String uploadedFileUrl = uploadToCloudStorage(fileName, fileInputStream);

    Datastore datastore = DatastoreOptions.getDefaultInstance().getService();
    KeyFactory keyFactory = datastore.newKeyFactory().setKind("Recipe");
    FullEntity<IncompleteKey> taskEntity =
        Entity.newBuilder(keyFactory.newKey())
            .set("steps", Arrays.toString(steps))
            .set("ingredients", Arrays.toString(ingredients))
            .set("tags", Arrays.toString(tags))
            .set("name", name)
            .set("imageURL", uploadedFileUrl)
            .set("timestamp", timestamp)
            .build();
    datastore.put(taskEntity);

    // // Print the value so you can see it in the server logs.
    // System.out.println("Name: " + name + " steps: " + Arrays.toString(steps) + " ingedients: " + Arrays.toString(ingredients) + " tags: " + Arrays.toString(tags));

    // // Write the value to the response so the user can see it.
    // response.getWriter().println("Name: " + name + " steps: " + Arrays.toString(steps) + " ingedients: " + Arrays.toString(ingredients) + " tags: " + Arrays.toString(tags));

    response.sendRedirect("/newrecipe.html");

  }

  /** Uploads a file to Cloud Storage and returns the uploaded file's URL. */
  private static String uploadToCloudStorage(String fileName, InputStream fileInputStream) {
    String projectId = "summer22-sps-25";
    String bucketName = "summer22-sps-25.appspot.com";
    Storage storage =
        StorageOptions.newBuilder().setProjectId(projectId).build().getService();
    BlobId blobId = BlobId.of(bucketName, fileName);
    BlobInfo blobInfo = BlobInfo.newBuilder(blobId).build();

    // Upload the file to Cloud Storage.
    Blob blob = storage.create(blobInfo, fileInputStream);

    // Return the uploaded file's URL.
    return blob.getMediaLink();
  }

}