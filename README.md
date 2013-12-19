LionSoft.Js
==============

This is a custom library of the javascript extensions.

The `LionSoft.Js` implements standard `.NET` library methods and even more.

Actually I know that it is 'yet another bicycle' but it helps me (and I hope someone else) learn JS. )))

Some single functions were borrowed from Intenet with saving their copyrights.

The most of the code is based on `TypeScript` sources with their `JavaScript` analogs.

Recommended for using in `VisualStudio` (otherwise you don't need this library).


Features
=====

 * Dynamic loading scripts with two
 * Standard methods for working with strings. Implementation of the `String.cs`.
 * Sync'd row position across orientation changes.
 * Configurable item margin.
 * Support for headers & footers.
 * Internal padding that does not affect the header & footer.
 * Extends [`AbsListView`](http://developer.android.com/reference/android/widget/AbsListView.html) - "mostly"
 * Supports [`AbsListView.OnScrollListener`](http://developer.android.com/reference/android/widget/AbsListView.OnScrollListener.html)

Setup
=====

The library was built for and tested on Android version 2.3.3(SDK 10) and above. It could be modified to support older versions if required.

To setup import the `/library` project into your Android Studio project and add it as a dependency in your `build.gradle`.

The library is currently configured to be built via Gradle only. It has the following dependencies:

 * Android Gradle plugin v0.6.3 - `com.android.tools.build:gradle:0.6.3`
 * Android Support Library v19 - `com.android.support:support-v4:19.0.+`

Usage
=====

*Please see the `/sample` app for a more detailed code example of how to use the library.*

1. Add the `StaggeredGridView` to the layout you want to show.
    ```xml
    <FrameLayout xmlns:android="http://schemas.android.com/apk/res/android"
        xmlns:app="http://schemas.android.com/apk/res-auto"
        android:layout_width="match_parent"
        android:layout_height="match_parent">
    
        <com.etsy.android.grid.StaggeredGridView
            android:id="@+id/grid_view"
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            app:item_margin="8dp"
            app:column_count_portrait="2"
            app:column_count_landscape="3" />
    
    </FrameLayout>
    ```
2. Configure attributes.
 * `item_margin` - The margin around each grid item (default 0dp).
 * `column_count_portrait` - The number of columns displayed when the grid is in portrait (default 2).
 * `column_count_landscape` - The number of columns displayed when the grid is in landscape (default 3).
 * `grid_paddingLeft` - Padding to the left of the grid. Does not apply to headers and footers (default 0).
 * `grid_paddingRight` - Padding to the right of the grid. Does not apply to headers and footers (default 0).
 * `grid_paddingTop` - Padding to the top of the grid. Does not apply to headers and footers (default 0).
 * `grid_paddingBottom` - Padding to the bottom of the grid. Does not apply to headers and footers (default 0).
3. Setup an adapter just like you would with a `GridView`/`ListView`.
    ```java
    ListAdapter adapter = ...;

    StaggeredGridView gridView = (StaggeredGridView) findViewById(R.id.grid_view);

    gridView.setAdapter(adapter);
    ```
**NOTE:**
As column widths change on orientation change, the grid view expects that all children
maintain their own width to height ratio. To assist with this the project includes the
`DynamicHeightImageView` as an example of a view that measures its height based on its width.

TODO
=====

The `StaggeredGridView` does not support the following:

 * Scroll bars
 * Row dividers
 * Edge effect
 * Fading edge
 * Item selection or long press
 * Overscroll

License
=======

    Copyright (c) 2013 Etsy

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.

[1]: http://f.cl.ly/items/2z1B0Y0M0G0O2k1l3J03/Trending.png
