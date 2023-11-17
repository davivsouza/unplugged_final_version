
package com.unplugged;
import android.app.usage.UsageStats;
import android.app.usage.UsageStatsManager;
import android.content.Context;

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
                appUsageMap.putString("packageName", usageStats.getPackageName());
                appUsageMap.putString("appName", getAppName(usageStats.getPackageName()));
                appUsageMap.putDouble("usageTime", usageStats.getTotalTimeInForeground() / 1000); // Em segundos
                appUsageArray.pushMap(appUsageMap);
            }
        }

        promise.resolve(appUsageArray);
    }

    private String getAppName(String packageName) {
        try {
            ApplicationInfo applicationInfo = reactContext.getPackageManager().getApplicationInfo(packageName, 0);
            return reactContext.getPackageManager().getApplicationLabel(applicationInfo).toString();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "";
    }


}