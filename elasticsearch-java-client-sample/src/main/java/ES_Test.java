import okhttp3.*;
import org.json.simple.JSONObject;

import java.io.IOException;
import java.util.HashMap;

/**
 * Created by udit on 23/05/16.
 */
public class ES_Test {

    public static final MediaType JSON = MediaType.parse("application/json; charset=utf-8");

    public static void main(String args[]) throws IOException {

        HashMap<String, String> document = new HashMap<String, String>();
        document.put("title", "Facebook denies bias in Trending Topics, but vows changes anyway");
        document.put("url", "http://techcrunch.com/2016/05/23/facebook-denies-bias-in-trending-topics-but-vows-changes-anyway/");
        document.put("content", "HTML Content");
        document.put("cleanContent", "Clean Content without noise");

        JSONObject jsonObj = new JSONObject(document);

        OkHttpClient client = new OkHttpClient();
        RequestBody body = RequestBody.create(JSON, jsonObj.toJSONString());
        Request request = new Request.Builder()
                .url("https://search-animated-umbrella-d2uu36sydurklzpmttf7isu4ra.us-west-2.es.amazonaws.com/document/external/3")
                .post(body)
                .build();

        Response response = client.newCall(request).execute();
        System.out.println(response.body().string());
    }

}
