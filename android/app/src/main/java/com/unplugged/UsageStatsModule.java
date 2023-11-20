
package com.unplugged;
import android.app.usage.UsageStats;
import android.app.usage.UsageStatsManager;
import android.content.Context;
import android.content.Intent;
import android.provider.Settings;
import android.content.pm.ApplicationInfo;
import android.os.Build;
import android.content.pm.PackageManager;
import android.graphics.Bitmap;
import android.graphics.Canvas;
import android.graphics.Matrix;
import android.graphics.drawable.BitmapDrawable;
import android.graphics.BitmapFactory;
import android.graphics.drawable.Drawable;
import android.util.Base64;
import androidx.annotation.RequiresApi;
import android.content.pm.PackageManager;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;

import java.io.ByteArrayOutputStream;
import java.util.List;
import java.io.File;
import java.io.FileOutputStream;
import java.io.FileInputStream;
import java.io.IOException;

public class UsageStatsModule extends ReactContextBaseJavaModule {
    private final ReactApplicationContext reactContext;

    public UsageStatsModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "UsageStatsModule";
    }

  @ReactMethod
public void getAppUsage(String startTimeString, String endTimeString, Promise promise) {
    long startTime = Long.parseLong(startTimeString);
    long endTime = Long.parseLong(endTimeString);

    UsageStatsManager usageStatsManager = (UsageStatsManager) reactContext.getSystemService(Context.USAGE_STATS_SERVICE);
    PackageManager packageManager = reactContext.getPackageManager();
    List<UsageStats> statsList = usageStatsManager.queryUsageStats(UsageStatsManager.INTERVAL_DAILY, startTime, endTime);

    WritableArray appUsageArray = Arguments.createArray();
    if (statsList != null) {
        for (UsageStats usageStats : statsList) {
            WritableMap appUsageMap = Arguments.createMap();
             String packageName = usageStats.getPackageName();

            String applicationName = getAppNameFromPackage(packageName, packageManager);

            appUsageMap.putString("package", packageName);
            appUsageMap.putString("name", applicationName);
            appUsageMap.putDouble("usageTime", usageStats.getTotalTimeInForeground() / 1000); // Em segundos



            // Obter o ícone do aplicativo
            try {
                Drawable icon = packageManager.getApplicationIcon(packageName);
                Bitmap bitmap = drawableToBitmap(icon);
                String iconBase64 = bitmapToBase64(bitmap);
                appUsageMap.putString("appIcon", iconBase64);
            } catch (PackageManager.NameNotFoundException e) {
                e.printStackTrace();
            }

            appUsageArray.pushMap(appUsageMap);
        }
    }

    promise.resolve(appUsageArray);
}

// Método para obter o nome do aplicativo de forma segura
private String getAppNameFromPackage(String packageName, PackageManager packageManager) {
    try {
        ApplicationInfo appInfo = packageManager.getApplicationInfo(packageName, 0);
        return (String) packageManager.getApplicationLabel(appInfo);
    } catch (PackageManager.NameNotFoundException e) {
        e.printStackTrace();
    }
    return "(unknown)";
}

// Método para converter Drawable em Bitmap
private Bitmap drawableToBitmap(Drawable drawable) {
    if (drawable instanceof BitmapDrawable) {
        return ((BitmapDrawable) drawable).getBitmap();
    }

    int width = drawable.getIntrinsicWidth();
    int height = drawable.getIntrinsicHeight();
    Bitmap bitmap = Bitmap.createBitmap(width, height, Bitmap.Config.ARGB_8888);
    Canvas canvas = new Canvas(bitmap);
    drawable.setBounds(0, 0, canvas.getWidth(), canvas.getHeight());
    drawable.draw(canvas);
    return bitmap;
}

// Método para converter Bitmap em Base64
private String bitmapToBase64(Bitmap bitmap) {
    ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
    bitmap.compress(Bitmap.CompressFormat.PNG, 100, byteArrayOutputStream);
    byte[] byteArray = byteArrayOutputStream.toByteArray();
    return Base64.encodeToString(byteArray, Base64.DEFAULT);
}


 @ReactMethod
    public void openUsageAccessSettings() {
        Intent intent = new Intent(Settings.ACTION_USAGE_ACCESS_SETTINGS);
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        reactContext.startActivity(intent);
    } 
    

}


