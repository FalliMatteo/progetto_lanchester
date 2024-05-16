<?php
    $size1 = $_POST["army1_size"];
    $power1 = $_POST["army1_power"];
    $size2 = $_POST["army2_size"];
    $power2 = $_POST["army2_power"];
?>
<!DOCTYPE html>
<html>
<head>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Freeman&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../css/styles.css">
    <title>Battle Simulator</title>
</head>
<body class="battle-body" onload="simulateBattle(<?php echo  $size1; ?>, <?php echo $power1; ?>, <?php echo $size2; ?>, <?php echo $power2; ?>)">
    <h1 id="result"></h1>
    <div id="battle-grid">
    <?php
        $army1 = [];
        $army2 = [];
        $gridSize = 10;
        $grid = array_fill(0, $gridSize, array_fill(0, $gridSize, false));
        for ($i = 0; $i < $size1; $i++) {
            $x = rand(55, 95);
            $y = rand(10, 90);
            $gridX = floor($x / $gridSize);
            $gridY = floor($y / $gridSize);
            if (!$grid[$gridX][$gridY]) {
                $army1[] = ['x' => $x, 'y' => $y];
                $grid[$gridX][$gridY] = true;
                echo "<div id='troop-" . $i . "-blue' class='troop' style='left: {$x}%; top: {$y}%; background-color: blue;'></div>";
            } else {
                $i--;
            }
        }
        for ($i = 0; $i < $size2; $i++) {
            $x = rand(5, 45);
            $y = rand(10, 90);
            $gridX = floor($x / $gridSize);
            $gridY = floor($y / $gridSize);
            if (!$grid[$gridX][$gridY]) {
                $army2[] = ['x' => $x, 'y' => $y];
                $grid[$gridX][$gridY] = true;
                echo "<div id='troop-" . $i . "-red' class='troop' style='left: {$x}%; top: {$y}%; background-color: red;'></div>";
            } else {
                $i--;
            }
        }
    ?>
    </div>
    <script src="../js/script.js"></script>
</body>
</html>